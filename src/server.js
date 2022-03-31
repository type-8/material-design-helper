var express = require('express');
var path = require('path');

app = express();
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use((req, res, next) => res.sendFile(path.join(__dirname, "..", "dist", "index.html")));

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);
