import fs from 'fs/promises'
export const readFile = async (path) => {
    try {
        const fileText = await fs.readFile(path, "utf-8", (err)=> {
            if (err) throw err
            console.log(" file read ");
        })
        console.log(fileText);

        return fileText
    } catch (error) {
        console.log(error);

    }
}

// readFile('./tools/generateCode.js')