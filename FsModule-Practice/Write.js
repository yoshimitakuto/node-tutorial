const fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello WriteFile Content', (err) => {
    if (err) throw err;
    console.log('定されたファイルとコンテンツが存在する場合はそれを置き換えます。ファイルが存在しない場合は、指定された内容を含む新しいファイルが作成される。');
});