const http = require('http');
const url = require('url');

let users = [];
let id = 1;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === '/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } 

    else if (path.match(/\/users\/\d+/) && method === 'GET') {
        const id = parseInt(path.split('/')[2]);
        const user = users.find(u => u.id === id);

        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } 

    else if (path === '/users' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { name, email } = JSON.parse(body);
            const user = { id: id++, name, email };
            users.push(user);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        });
    } 

    else if (path.match(/\/users\/\d+/) && method === 'PUT') {
        const id = parseInt(path.split('/')[2]);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { name, email } = JSON.parse(body);
            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex !== -1) {
                users[userIndex] = { id, name, email };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users[userIndex]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    } 
    
    else if (path.match(/\/users\/\d+/) && method === 'DELETE') {
        const id = parseInt(path.split('/')[2]);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex !== -1) {
            users.splice(userIndex, 1);

            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
