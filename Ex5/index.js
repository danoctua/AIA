const express = require('express')
const routing = require('./routing');
const session = require('express-session');
const parser = require('body-parser')
const app = express()

app.use('/', routing);
app.use(express.static('static'));
app.use(parser.urlencoded({extended:false}))

app.use(session({
    secret: 'ldfhajslhw89fyw89f',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port ' + server.address().port);
});


function onInit() {
    connection = routing.connection;
    connection.connect(function (err) {
            if (err) {
                throw err;
            }

        }
    )
}

