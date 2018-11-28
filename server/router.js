var express = require('express');
var router = express.Router();
var DbUtils = require('./DbUtils');
var fs = require('fs');
var path = require('path');
router.get('/getCommentsList', function (req, res) {
    DbUtils.queryData('SELECT * from testName', function (date) {
        res.status(200).json(date);
    });
});
router.get('/', function (req, res) {
    fs.readFile(path.join(__dirname, './JDinServer/index.html'), 'utf8', function (err, content) {
        if (err) {
            return res.status(500).end('服务器访问出错');
        }
        res.status(200).end(content);
    });
});
router.get('/toCategory',function (req,res) {
    fs.readFile(path.join(__dirname, './JDinServer/category.html'), 'utf8', function (err, content) {
        if (err) {
            return res.status(500).end('服务器访问出错');
        }
        res.status(200).end(content);
    });
});
module.exports = router;