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
    password: '',
    // SQLインジェクション対策（デフォルトではfalseとなっている）
    stringifyObjects: true,
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
    connection.query('SELECT * FROM todo WHERE deleted_at IS NULL', (error, results) => { //[deleted_at IS NULL]を追加してカラムがnull以外のものを取得するようにして、論理削除を実現！！
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
    connection.query(
        'INSERT INTO todo (status, task) VALUE (?, ?)', 
        [todo.status, todo.task], 
        (error, results) => { //SQLの？の部分には第二引数の[todo]がバインドされる（バインド：紐づける・関連づける・割り当てる）
            if (error) {
                console.error(error);
                res.status(500).send("error");
                return;
            }
            res.send("ok");
        }
    );
    // res.send("OK"); //試し用
});

app.put('/todo/:todoId', (req, res) => {
    console.log(req.params);
    const todoId = req.params.todoId;
    console.log(req.body);
    const todo = {
        status: req.body.status,
        task: req.body.task,
    };
    connection.query(
        'UPDATE todo SET status=?, task=? WHERE id=? AND deleted_at IS NULL', //論理削除につき、putでも対象外とする[AND deleted_at IS NULL]
        [todo.status,todo.task,todoId],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("error");
                return;
            }
            res.send("ok");
        }
    );
});

// 実際にはAPI上ではあたかも削除されているように見せる「論理削除・ソフトデリーテッド」を使用する（論理削除対応コード）
app.delete('/todo/:todoId', (req, res) => {
    console.log(req.params);
    const todoId = req.params.todoId;
    connection.query(
        'UPDATE todo SET deleted_at=? WHERE id=?',
        [new Date(), todoId],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("error");
                return;
            }
            res.send("ok");
        }
    );
    // connection.query(
    //     'DELETE FROM todo WHERE id=?',
    //     todoId,
    //     (error, results) => {
    //         if (error) {
    //             console.error(error);
    //             res.status(500).send("error");
    //             return;
    //         }
    //         res.send("ok");
    //     }
    // );
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});