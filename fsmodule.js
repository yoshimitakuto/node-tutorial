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
    if (err) {
        console.error(err);
    } else {
        console.log('ファイル作成完了');
    }
});

// fs.appendFile(ファイルのパス, 追記したいデータ,  コールバック関数)
const addfs = fs.appendFile('./testWriteFile.txt', 'appendFileを利用して文字列を追記しました！', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('指定ファイルに追記完了');
    }
});

// fs.unlink(ファイルのパス, コールバック関数)
const deletefs = () => {
    alert('ffff');
    const check = window.confirm("ファイルを削除します。よろしいですか？");
    if (check) {
        fs.unlink('./testWriteFile.txt', (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('ファイルを削除しました');
            }
        });
    } else {
        alert('ファイル削除を取り消しました');
    }
};

module.exports = readfs, writefs, addfs, deletefs; 
