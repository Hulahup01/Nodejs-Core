const fs = require('fs');
const readline = require('readline');

async function writeFile() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (query) => {
        return new Promise((resolve) => rl.question(query, resolve));
    };

    try {
        const text = await question('Write the text: ');
        const filename = await question('Write the file name: ');
        
        fs.writeFile(filename, text, (err) => {
            if (err) {
              console.error('Error while writing:', err);
            } else {
              console.log('File successfully recorded');
            }
        });
    } catch (err) {
        console.error(err);
    } finally {
        rl.close();
    }
};

writeFile();
