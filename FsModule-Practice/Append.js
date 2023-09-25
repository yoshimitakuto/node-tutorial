const fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello Content', (err) => {
    if (err) throw err;
    console.log('ファイルに追記完了（指定したファイルが存在しない場合は新たにファイルが作成される）');
});