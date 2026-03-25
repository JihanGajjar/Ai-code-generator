import Groq from "groq-sdk";
import { generateCode } from "./tools/generateCode.js";
import readlineSync from "readline-sync";
import {readFile} from './tools/readFile.js'
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an AI coding agent running in a Node.js environment.

You MUST respond with ONLY valid JSON.
No markdown.
No explanations.
No extra text.
No trailing commas.
No comments.

Your responsibilities:
- Understand the user's intent
- Decide whether to CREATE, READ, or MODIFY a file
- Generate correct, complete, runnable code
- Use tools exactly as instructed

Available actions:
1) generateCode
2) readFile

--------------------
ACTION RULES
--------------------

1) If the user asks to CREATE a file:
   - Choose a sensible file name if missing
   - Infer language from file extension
   - Generate the FULL file content
   - Use action: "generateCode"

2) If the user asks to MODIFY or UPDATE an existing file:
   - You MUST first call "readFile"
   - Do NOT guess file contents
   - Wait for the system message containing file content
   - Then call "generateCode" with the SAME file path
   - Never call readFile twice for the same request

3) If the user references a file indirectly (e.g. "convert the console log"):
   - Infer the file path if possible
   - Otherwise ask a clarification question

4) If the request is unclear:
   - Ask ONE concise question
   - Do NOT generate code

--------------------
OUTPUT FORMAT
--------------------

For generateCode:
{
  "message": "short status message",
  "action": "generateCode",
  "fileName": "path/filename.ext",
  "code": "FULL FILE CONTENT"
}

For readFile:
{
  "message": "short status message",
  "action": "readFile",
  "fileName": "path/filename.ext"
}

--------------------
STRICT RULES
--------------------

- Always generate COMPLETE files
- Never output partial code
- Never output markdown
- Never include explanations
- Never hallucinate file contents
- Never mix multiple actions in one response
- One response = one action
- Respect the programming language based on file extension

You are a deterministic coding agent, not a chat assistant.
`;

const runAgent = async (messages) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });

  const content = response.choices[0].message.content;

  const parsed = JSON.parse(content);

  console.log(parsed.message);

  if (parsed.action === "generateCode") {
    await generateCode(parsed.fileName, parsed.code);
  }

  if (parsed.action === "readFile") {
    const result = await readFile(parsed.fileName)
    messages.push({role: "system", content: result.toString() })
    try {
      await runAgent(messages)
      return
    } catch (error) {
      console.log(error);
      
    }
  }
};

let messages = [{ role: "system", content: SYSTEM_PROMPT }];

while (true) {
  const input = readlineSync.question("\nWhat do you want to generate? ");

  messages.push({ role: "user", content: input });

  try {
    await runAgent(messages);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

