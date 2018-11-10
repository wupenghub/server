var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'mybatis'
});
connection.connect();
var Dbutils = {
    queryData(sql, getResult) {
        connection.query(sql, function (error, results, fields) {
            if (error) return getResult({});
            getResult(results);
        });
    },
    closeDb() {
        connection.end();
    }
};
module.exports = Dbutils;