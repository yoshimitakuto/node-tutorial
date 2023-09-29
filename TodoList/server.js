const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const hostName = "localhost";

app.use(express.static('statics'));

app.listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}/ 🚀`);
});