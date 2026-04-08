import fs from "fs/promises";

export const generateCode = async (fileName, code, message) => {
  await fs.writeFile(fileName, code, "utf8", (err) => {
    if (err) throw err
    console.log(message);
  
  });
};
