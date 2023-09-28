const e = require('express');
const app = e();
const mysql = require('mysql2');
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan());

// mysqlと接続
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'express_todoapp_db',
    password: ''
});

// mysqlとの接続確認
connection.connect((err) => {
    if (err) {
        console.log(`error connecting: ${err.stack}`);
        return;
    } else {
        console.log('SUCCESS: connecting mysql now 👍');
    }
});

// JSON形式で送信されたデータを扱うための設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ミドルウェア（自作）
const myCustomLogger = (options) => (req, res, next) => {
    if (options) {
        console.log(`LOGGER ${options}`);
        next();
    } else {
        console.log('ERROR LOG');
    }
};

// API
app.get('/todo', myCustomLogger("ミドルウェア起動中"), (req, res) => {
    connection.query('SELECT * FROM todo', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("error");
            return;
        }
        res.json(results);
    });
});

app.post('/todo', (req, res) => {
    console.log(req.body); //req.bodyにpostされたデータが格納されている
    const todo = { //オブジェクトに値を格納する
        status: req.body.status,
        task: req.body.task,
    };
    connection.query('INSERT INTO todo SET ?', todo, (error, results) => { //SQLの？の部分には第二引数の[todo]がバインドされる（バインド：紐づける・関連づける・割り当てる）
        if (error) {
            console.error(error);
            res.status(500).send("error");
            return;
        }
        res.send("ok");
    });
    // res.send("OK"); //試し用
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});