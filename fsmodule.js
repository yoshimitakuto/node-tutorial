const fs = require('fs');

// fs.readFile(ファイルのパス, 文字コード, コールバック関数)
const readfs = fs.readFile('./hello.js', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

// fs.writeFile(ファイルのパス, ファイルの中身, コールバック関数) ※ 既存ファイルを指定して実行した場合は上書き保存がされてしまうため要注意！
const writefs = fs.writeFile('./testWriteFile.txt', 'fsモジュールの「writeFile」で作成しました！', (err) => {
    console.log('ファイル作成完了');
});

module.exports = readfs, writefs;
