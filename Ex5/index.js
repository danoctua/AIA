const express = require('express')
const routing = require('./routing');
const session = require('express-session');
const parser = require('body-parser')
const app = express()
const mysql = require("mysql")
const fs = require('fs');
const initData = require("./data/ItemsData.json")


app.use(session({
    secret: 'ldfhajslhw89fyw89f',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.set('view engine', 'ejs');
app.use('/', routing);
app.use(express.static('static'));


var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port ' + server.address().port);
    onInit()
});

// test function for creating table and uploading basic list of items
function onInit() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'aia_test_user',
        password: 'FSAfewa4fw83;',
        database: 'aia_assignments'
    })
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected to database")
        connection.query("DROP TABLE items", function (err, result) {

        })
        connection.query("CREATE TABLE items (item_no NUMERIC primary key, brand VARCHAR(255), model VARCHAR(255), img_src TEXT(200), rating NUMERIC, description TEXT(300))",
            function (err, result) {
                if (err) {
                    throw err;
                } else {
                    console.log("Table created")
                    // let data = JSON.parse(initData);
                    data = initData["Items"]
                    let ls = []
                    data.forEach(function (element) {
                        ls.push([element.id, element.brand, element.model, element.src, element.rating, element.description])
                    })
                    sql = "INSERT INTO items (item_no, brand, model, img_src, rating, description) VALUES ?"
                    connection.query(sql, [ls], function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    })
                }

            })

    })
    connection.commit()
}

