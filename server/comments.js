var express = require('express');
var router = require('./router');
var app = express();
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(router);
app.use('/public/', express.static('./JDinServer/public/'));
app.use('/node_modules/', express.static('./JDinServer/node_modules/'));
app.listen(5000, function () {
    console.log('Running...');
});
