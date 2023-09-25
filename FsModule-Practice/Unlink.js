const fs = require('fs');

fs.unlink('mynewfile2.txt', (err) => {
    if (err) throw err;
    console.log('指定されたファイルを削除');
});