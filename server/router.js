var express = require('express');
var router = express.Router();
var DbUtils = require('./DbUtils');
var fs = require('fs');
router.get('/getCommentsList', function (req, res) {
    DbUtils.queryData('SELECT u.nikeName,c.comment FROM `comments` c,`user` u WHERE c.userid = u.id GROUP BY u.id,u.nikeName,c.`comment`', function (date) {
        res.status(200).json(date);
    });
});
router.get('/', function (req, res) {
    fs.readFile('C:/Users/ITSM/WebstormProjects/server/server/JDinServer/index.html', 'utf8', function (err, content) {
        if (err) {
            return res.status(500).end('服务器访问出错');
        }
        res.status(200).end(content);
    });


});
module.exports = router;