const express = require('express');
const app = express();
const mysql = require('mysql2');


// 定数connectionにcreateConnectionを使って接続するデータベースの情報を格納する
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    // port: '3305',
    database: 'node_tutorial_db'
});

/* ルーティング設定の基本構成
 app.get('アクセスするURL', (req, res) => {
     URLにアクセルした際の挙動を記載
}); */

app.use(express.static('link'));

// index.ejsファイルのルーティング設定
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// test.ejsファイルのルーティング設定
app.get('/test', (req, res) => {
    res.render('test.ejs');
});

// test.ejsファイルのルーティング設定
app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.listen(3000);