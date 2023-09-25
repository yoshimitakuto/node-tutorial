const fs = require('fs');

fs.rename('mynewfile1.txt', 'mynewfile.txt', (err) => {
    if (err) throw err;
    console.log('指定ファイルの名前を変更');
});