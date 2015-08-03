
/*
 * GET home page.
 */
var sql = require('mssql');
var tedious = require('tedious');
exports.index = function (req, res) {
    
    var Connection = require('tedious').Connection;
    var config = {
        userName: 'admin',
        password: 'Sysgain123',
        server: '168.61.15.99',
        options: {
            port: 1433,
            database: 'AdventureWorks2012',
            rowCollectionOnDone: true
        }
    }
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        console.log("connected");
        request = new Request("select TOP 4 ProductID from Production.Product;", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        var record = "";
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result += column.value + " ";
                }
            });
            console.log(result);
            // record += result;
           // result = "";
        });
        connection.execSql(request);
       //executeStatement();
            
        res.render('index', { title: 'Express', year: new Date().getFullYear() , recordset: result });
    });
    
    
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    
    function executeStatement() {
        request = new Request("select ProductID from Production.Product;", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result += column.value + " ";
                }
            });
            console.log(result);
            result = "";
        });
        connection.execSql(request);
        
    }
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page.' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
};
