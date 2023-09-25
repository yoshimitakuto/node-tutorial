const express = require('express');
const app = express();
const port = 300;

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});