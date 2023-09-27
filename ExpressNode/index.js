const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(morgan()); // 全ての機能で実行可能にする

// JSON形式で送信されたリクエストを扱うために必要なミドルウェア
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// mysqlと接続
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'express_todoapp_db',
    // 本番環境では環境設定を使用する
    password: ''
});

connection.connect((err) => {
    if (err) {
        console.log(`error connecting: ${err.stack} 😱`);
        return;
    } else {
        console.log('SUCCESS: connecting mysql now 👍');
    }
});


// ============ミドルウェア関数==============

// ミドルウェア関数を作る
const myLogger = (req, res, next) => {
    console.log('LOGGER!!');
    next();
};
app.use(myLogger); //すべてのAPIに適用させたい場合はuseメソッドを使用する

// 自作ミドルウェア
const requestTime = (req, res, next) => {
    req.requestTime = Date.now(); //なんらかの値を取得して、それを後続処理に伝えたい場合はこのような書き方をされることが多い
    next();
};

// 設定可能なミドルウェア関数 ※関数を返す関数の書き方
const myCustomLogger = (option) => (req, res, next) => {
    if (option) {
        console.log(`LOGGER ${option}`);
    } else {
        console.log('ERROR'+' '+'LOGGER');
    }
    next();
};

const interests = [
    {
        name: "programing",
        emoji: "💻",
        score: 80
    },
    {
        name: "motorcycle",
        emoji: "🛞",
        score: 45
    },
]

// JSONを返すAPIを実装してみる
app.get('/', (req, res) => {
    res.json(interests);
    // res.send("Hello World!"); //文字列を受け取るメソッドのため「res.send(JSON.stringify(interests))」とする
});

// クエリーを使用して値をgetしている
app.get('/todo', (req, res) => {
    connection.query('SELECT * FROM todo', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send("error");
            return;
        }
        console.log(results);
        res.json(results);
    });
});

app.post('/todo/add', (req, res) => {
    connection.query('INSERT INTO todo(status,task) VALUE(?,?)', [req.body.addStatus,req.body.addTask], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send("error");
            return;
        } 
        connection.query('SELECT * FROM todo', (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("error");
                return;
            }
            res.render('todo.pug', { todoTable: results });
        });
    });
});


// ============通常のルーティング==============

// 取得
app.get('/hogehoge', (req, res) => { //第二引数にミドルウェア関数を入れると実行される
    res.send("hogehoge");
});

// データ送信
app.post('/', myLogger, requestTime, myCustomLogger('hogehoge'), (req, res) => { //引数にミドルウェア関数をいくつも入れることが可能
    console.log(req.requestTime);
    console.log(req.body);
    res.send("Got a Post request");
});

// 更新
app.put('/user/:id', (req, res) => {
    res.send("Got a Put request");
});

// 削除
app.delete('/user/:id', (req, res) => {
    res.send("Got a Put request");
});


// ============複雑なルーティング==============

// 「b」があってもなくても良い
app.get('/ab?cd', (req, res) => {
    res.send('ab?cd');
});

// 「b」がひとつ以上ならいくつあっても良い
app.get('/ab+cd', (req, res) => {
    res.send('ab+cd');
});

// 「bとc」の間にはどんな文字列でも含んで良い（「abdl/f_/flo;pcd」でも200OKで返してくれる）
app.get('/ab*cd', (req, res) => {
    res.send('ab*cd');
});

// 「cd」があってもなくても良い
app.get('/ab(cd)?e', (req, res) => {
    res.send('ab(cd)?e');
});


// ============正規表現に基づくルーティング==============

// 「a」が含まれていればなんでもOK！
app.get(/a/, (req, res) => {
    res.send('/a/');
});

// 「fly」の前はどのような文字列がいくつ入っても良いが最後はflyで終わる必要がある
app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
});


// ============ルートパラメーターのルーティング==============
app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});