const fs = require('fs');

fs.appendFile('mynewfile1.txt', 'This is my text', (err) => {
    if (err) throw err;
    console.log('既存ファイルへ追記');
});