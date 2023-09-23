'use strict';

const http = require("http"); //httpモジュール読み込み
const url = require('url');
const dt = require('./DateModule'); //独自モジュール読み込み

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200; //200はすべて問題ないことを意味している
    res.setHeader('Content-Type', 'text/html'); //httpサーバーからの応答がHTMLとして表示させる場合は「text/html」と正しいコンテンスタイプのhttpヘッダーを含める必要がある。
    const q = url.parse(req.url, true).query;
    const res = q.year + " " + q.month;
    res.end(res);
    // res.end(req.url); //URLの最後にsummerを入れると「/summer」と表示される
});

server.listen(port, hostname, () => {
    console.log(`${dt.myDateTime()} Server running at http://${hostname}:${port}/`);
});