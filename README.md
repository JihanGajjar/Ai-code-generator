# Simple AI Code Agent (Node.js)

A minimal **AI coding agent** built with **Node.js** and **Groq LLMs** that can generate code and write files to your local filesystem.

This project is intentionally simple to help you understand **how AI agents work under the hood** — no heavy frameworks, no magic.

---

## ✨ Features

* 🤖 AI-powered code generation
* 📁 Creates files automatically
* 🌐 Supports **any programming language** (based on file extension)
* ⚡ Uses **Groq (LLaMA 3.1)** — fast and free (no billing required)
* 🧠 Clean JSON-based agent → tool execution flow

---

## 🧠 How It Works

1. User enters a prompt (e.g. "create js file test.js with console log")
2. The LLM responds with **strict JSON** describing:

   * file name
   * code content
   * action to perform
3. Node.js parses the JSON
4. The `generateCode` tool writes the file to disk

The AI **never executes code directly** — it only describes actions.

---

## 🛠 Tech Stack

* **Node.js** (ES Modules)
* **Groq SDK** (`llama-3.1-8b-instant`)
* **dotenv** – environment variables
* **readline-sync** – CLI input

---

## 📦 Installation

```bash
git clone (https://github.com/Harshitnakrani/ai-code-generator.git)
cd ai-code-generator
npm install
```

---

## 🔑 Environment Setup

Create a `.env` file in the root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key from: [https://console.groq.com](https://console.groq.com)

---

## ▶️ Run the Agent

```bash
node index.js
```

Then type prompts like:

* `create js file test.js with console log`
* `create python file app.py that prints hello`
* `create html file index.html with a basic page`

---

## 📁 Project Structure

```
├── index.js
├── tools/
│   └── generateCode.js
├── .env
├── package.json
└── README.md
```

---

## ⚠️ Notes & Limitations

* Files will be overwritten if the same name is used
* No sandboxing (be careful what you generate)
* JSON-only responses are required from the model

---

## 🚀 Future Improvements

* File overwrite protection
* Multi-file generation
* Planner → executor architecture
* Diff-based file updates
* Local LLM support (Ollama)

---

## 📌 Why This Project

This project is meant for **learning**, not production use.

If you want to understand:

* AI agents
* Tool calling
* LLM + filesystem interaction

This is a great place to start.

---

## 🧑‍💻 Author

Built while learning and building in public.

If this helped you, feel free to ⭐ the repo and experiment further 🚀
