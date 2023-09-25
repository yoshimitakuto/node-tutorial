const fs = require('fs');

fs.open('mynewfile2.txt', 'w', (err, file) => {
    if (err) throw err;
    console.log('第二引数としてフラグを受け取ります。「w」は書き込みを表すため指定ファイルが書き込み用に開かれる');
});