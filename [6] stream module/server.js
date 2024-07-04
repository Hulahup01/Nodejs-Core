const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the File Server</h1>');
    } 
    
    else if (pathname.startsWith('/files/')) {
        const filePath = path.join(__dirname, pathname);

        fs.stat(filePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server error');
                }
                return;
            }

            if (stats.isFile()) {
                res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
                const readStream = fs.createReadStream(filePath);
                readStream.pipe(res);
            } else {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('Forbidden');
            }
        });
    } 
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
