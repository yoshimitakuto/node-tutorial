const fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text replace', (err) => {
    if (err) throw err;
    console.log('ファイルの中身を書き換える');
});