const express = require('express');
const router = express.Router()
const mysql = require('mysql');


router.get('/', (req, res) => {
    let result = [];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'aia_test_user',
        password: 'FSAfewa4fw83;',
        database: 'aia_assignments'
    })

    let local_cart = req.session.cart || [];

    connection.connect(function (err) {
        if (err) {
            result = []
            set_alert(req, "Can't connect to the db", "danger")
            let alertLs = get_alert(req);
            let alertText = alertLs[0]
            let alertType = alertLs[1]
            res.render("index", {
                "alert": alertText,
                "items": result,
                "alert_type": alertType,
                "local_cart": local_cart
            });
        }
        connection.query("SELECT * FROM items", function (err, result, fields) {
            if (err) throw err;
            let alertLs = get_alert(req);
            let alertText = alertLs[0]
            let alertType = alertLs[1]
            res.render("index", {
                "alert": alertText,
                "items": result,
                "alert_type": alertType,
                "local_cart": local_cart
            });
        });
    })

})


// Access the session as req.session
router.get('/cart', (req, res) => {
    let alertText, alertType;
    let result = []
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'aia_test_user',
        password: 'FSAfewa4fw83;',
        database: 'aia_assignments'
    })

    connection.connect(function (err) {
        if (err) {

            console.log(err)
            set_alert(req, "Can't connect to the db", "danger")
            let alertLs = get_alert(req);
            alertText = alertLs[0]
            alertType = alertLs[1]
            res.render("cart", {"alert": alertText, "items": result, "alert_type": alertType})

        } else {
            if (!req.session.cart || !req.session.cart.length) {
                set_alert(req, "You have to add items first", "warning")
                let alertLs = get_alert(req);
                alertText = alertLs[0]
                alertType = alertLs[1]
                res.render("cart", {"alert": alertText, "items": result, "alert_type": alertType})

            } else {
                sql = "SELECT * FROM items WHERE item_no in (?)"
                let tmp_ls = [];
                for (item in req.session.cart) {
                    tmp_ls.push(parseInt(item))
                }
                // console.log(connection.query(sql, [tmp_ls]).sql)
                connection.query(sql, [req.session.cart], function (err, result, fields) {
                    if (err) throw err;
                    let alertLs = get_alert(req);
                    alertText = alertLs[0]
                    alertType = alertLs[1]
                    res.render("cart", {"alert": alertText, "items": result, "alert_type": alertType})

                });
            }
        }

    })

})

function get_alert(req) {
    let alert = req.session.alert;
    let alert_type = req.session.alert_type;
    req.session.alert = null;
    req.session.alert_type = null;
    return [alert, alert_type]
}

function set_alert(req, alert_text, alert_type) {
    req.session.alert = alert_text;
    req.session.alert_type = alert_type
    return req;
}

router.post('/', (req, res) => {
    var item_no = req.body.addToCart;

    console.log("Added", item_no)

    if (!item_no) {
        set_alert(req, "No item number sent to the server", "danger")
    }

    if (!req.session.cart) {
        req.session.cart = []
    }

    var exists = false
    req.session.cart.forEach(ex_item_no => {
        if (ex_item_no === item_no) {
            exists = true
        }
    });
    if (!exists) {
        req.session.cart.push(item_no)
        set_alert(req, "Item has been added to your cart", "success")
    } else {
        set_alert(req, "Item already is in your cart", "danger")
    }
    res.redirect('/')
})


router.post('/cart', (req, res) => {
    var item_no = req.body.deleteItem;

    console.log("Removed", item_no)
    if (!item_no) {
        set_alert(req, "No item number sent to the server", "danger")
    }

    if (!req.session.cart) {
        req.session.cart = []
        set_alert(req, "No item in the cart", "danger")
    } else {
        let local_cart = req.session.cart;
        let found = false;
        for (let item_no_ in local_cart) {
            if (item_no_ === item_no) {
                req.session.cart.splice(local_cart.indexOf(item_no), 1)
                console.log("After remove", local_cart, req.session.cart)
                set_alert(req, "Item has been removed", "success")
                found = true;
            }
        }
        if (!found) {
            set_alert(req, "Item is not in the cart", "danger")
        }
    }
    res.redirect('/cart')

})


module.exports = router;
