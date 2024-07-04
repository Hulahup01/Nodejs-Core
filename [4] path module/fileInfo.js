const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide a file path as a command line argument.');
    process.exit(1);
}

const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
const absolutePath = path.resolve(filePath);

console.log(`File name without extension: ${fileNameWithoutExt}`);
console.log(`Absolute path to the file: ${absolutePath}`);