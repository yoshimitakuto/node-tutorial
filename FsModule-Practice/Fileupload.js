const http = require('http');
//アップロードされたファイルがサーバーに到着したときに解析できるように、Formidable モジュールを含めます。
const formidable = require('formidable'); 

http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            res.write('ファイルアップロード');
            res.end();
        });
    } else {
        res.writeHead('200', { 'Content-Type': 'text/html' });
        res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name=""fileupload><br>');
        res.write('<input type="submit">');
        res.write('<form>');
        return res.end();
    }
}).listen(8080);