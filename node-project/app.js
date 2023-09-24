const express = require('express');
const app = express();
const hostName = '127.0.0.1';
const port = 3000;
const dt = require('../DateModule');
const mysql = require('mysql2');
const e = require('express');

app.use(express.static('link'));
//フォームの値を受け取るために必要な典型文
app.use(express.urlencoded({extended: false}));


// 定数connectionにcreateConnectionを使って接続するデータベースの情報を格納する
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'node_tutorial_db'
});

connection.query (
    //SQL文でusersテーブルからすべてのデータ（*は全てのデータ）を取得する命令文
    'SELECT * FROM users',
    (error, results) => {
        console.log(error);
        console.table(results);
    }
);

/* ルーティング設定の基本構成
 app.get('アクセスするURL', (req, res) => {
     URLにアクセルした際の挙動を記載
}); */

// index.ejsファイルのルーティング設定
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// test.ejsファイルのルーティング設定
app.get('/test', (req, res) => {
    res.render('test.ejs');
});

// データベースから値を取得して表示
app.get('/top', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            if (error) {
                console.error(error);
                res.render('error', { message: 'errorが発生しました' });
            } else {
                res.render('top.ejs', { userTable: results });
                /*rendar()関数は、第２引数に｛プロパティ名：値｝のオブジェクト型でデータを記載することで、
                EJSにデータを受け渡すことができます。*/
            }
        }
    );
});

// データベースから値を追加
app.post('/top', (req, res) => {
    connection.query(
        //データベースに値を追加
        'INSERT INTO users(id,name) VALUES(?,?)', 
        [req.body.addId,req.body.addName],

        //値を追加した状態で、再度データベースのデータを取得し、top.ejsを画面に表示させる。
        (error, results) => {
            if (error) {
                console.error(error);
                res.render('error', { message: 'エラーが発生しました' });
            } else {
                connection.query(
                    'SELECT * FROM users',
                    (error, results) => {
                        if (error) {
                            console.error(error);
                            res.render('error', { message: 'errorが発生しました' });
                        } else {
                            res.render('top.ejs', { userTable: results });
                            /*rendar()関数は、第２引数に｛プロパティ名：値｝のオブジェクト型でデータを記載することで、
                            EJSにデータを受け渡すことができます。*/
                        }
                    }
                );
            }
        }
    );
});

// データベースの値を削除
app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM users WHERE id=?',
        [req.params.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.render('test.ejs', { message: 'エラーが発生しました' });
            } else {
                res.redirect('/top');
            }
        }
    )
});

// 編集画面へ遷移
app.get('/editing/:id', (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.params.id],
        (error, results) => {
            if (error) {
                console.log(error);
                res.render('/editing/:id', { message: 'エラーが発生しました' });
            } else {
                res.render('editing.ejs', { userTable: results[0] });
            }
        }
    );
});

// データベースを編集
app.post('/update/:id', (req, res) => {
    connection.query(
        'UPDATE users SET name=? WHERE id = ?',
        [req.body.updateName,req.params.id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.render('error', { message: 'エラーが発生しました' });
            } else {
                res.redirect('/top');
            }
        }
    );
});


app.listen(port, hostName, () => {
    console.log(`${dt.myDateTime()} Server running at http://${hostName}:${port}/`);
});