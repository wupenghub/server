var express = require('express');
var router = express.Router();
var DbUtils = require('./DbUtils');
router.get('/getCommentsList', function (req, res) {
    DbUtils.queryData('SELECT u.nikeName,c.comment FROM `comments` c,`user` u WHERE c.userid = u.id GROUP BY u.id,u.nikeName,c.`comment`', function (date) {
        res.status(200).json(date);
    });
});
module.exports = router;