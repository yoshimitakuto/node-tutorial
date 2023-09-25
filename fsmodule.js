const fs = require('fs');

// fs.readFile(ファイルのパス, 文字コード, コールバック関数)
exports.read = fs.readFile('./hello.js', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

