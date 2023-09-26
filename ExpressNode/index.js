const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));

// JSON形式で送信されたリクエストを扱うために必要なミドルウェア
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


// ============通常のルーティング==============

// 取得
app.get('/hogehoge', (req, res) => {
    res.send("hogehoge");
});

// データ送信
app.post('/', (req, res) => {
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