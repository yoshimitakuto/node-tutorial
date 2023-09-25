const fs = require('fs');
const http = require('http');

// http.createServer(function (req, res) {
//     fs.readFile('demo1.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
//   }).listen(8080);

// 非同期（Promise）
const asyncFs = require('fs').promises;

const readFile = async (file) => {
  try {
    const buff = await asyncFs.readFile(file, "utf-8");
    console.log(buff);
  } catch (e) {
    console.log(e.message);
  }
};
readFile("mynewfile3.txt");