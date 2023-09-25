const http = require('http');
const port = 3000;
const hostName = "127.0.0.1";

// 外部ファイル読み込み
const fs = require('./fsmodule');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(fs.read);
});

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/ 🚀`);
});