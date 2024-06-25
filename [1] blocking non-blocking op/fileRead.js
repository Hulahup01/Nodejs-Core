const fs = require('fs');
const path = './text.txt';

console.time('Blocking Read Time');
try {
    const data = fs.readFileSync(path, 'utf8');
    console.log('done');
} catch (err) {
    console.error(err);
}
console.timeEnd('Blocking Read Time');

console.time('Non-Blocking Read Time');
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('done');
    console.timeEnd('Non-Blocking Read Time');
});

