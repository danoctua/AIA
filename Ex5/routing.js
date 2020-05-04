const express = require('express');
const router = express.Router()
const mysql = require('mysql');


function get_mysql_connection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'aia_test_user',
        password: 'FSAfewa4fw83;',
        database: 'aia_assignments'
    })
}

function get_cart_int(req) {
    let local_cart = req.session.cart || [];

    let tmp_ls = [];
    for (let i = 0; i < local_cart.length; i++) {
        tmp_ls.push(parseInt(local_cart[i]))
    }
    return tmp_ls
}


router.get('/', (req, res) => {
    let result = [];

    var connection = get_mysql_connection()

    let local_cart = get_cart_int(req)

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
    var connection = get_mysql_connection()

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
                if (!req.session.alert) {
                    set_alert(req, "You have to add items first", "warning")
                }
                let alertLs = get_alert(req);
                alertText = alertLs[0]
                alertType = alertLs[1]
                res.render("cart", {"alert": alertText, "items": result, "alert_type": alertType})

            } else {
                sql = "SELECT * FROM items WHERE item_no in (?)"
                let local_cart = get_cart_int(req)
                connection.query(sql, [local_cart], function (err, result, fields) {
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
    var item_no = req.body.deleteItem
    let reset = req.body.reset
    let confirm = req.body.confirm
    if (item_no) {
        if (!req.session.cart) {
            req.session.cart = []
            set_alert(req, "No item in the cart", "danger")
        } else {
            let local_cart = get_cart_int(req)
            let found = false;
            for (let i = 0; i < local_cart.length; i++) {
                if (local_cart[i] === item_no) {
                    req.session.cart.splice(i, 1)
                    set_alert(req, "Item has been removed", "success")
                    found = true;
                }
            }
            if (!found) {
                set_alert(req, "Item is not in the cart", "danger")
            }
        }
        res.redirect('/cart')
    } else if (reset) {
        reset_purchase(req)
        res.redirect('/')
    } else if (confirm) {
        let sql;
        let local_cart = get_cart_int(req)
        var connection = get_mysql_connection()

        connection.connect(function (err) {
            if (err) {
                set_alert(req, "Can't connect to the db", "danger")
                let alertLs = get_alert(req);
                let alertText = alertLs[0]
                let alertType = alertLs[1]
                res.redirect('/cart')
            }

            sql = "SELECT * FROM items WHERE item_no in (?)"
            connection.query(sql, [local_cart], function (err, result, fields) {
                if (err) set_alert(req, "DB error: " + err, "danger");
                if (result.length < local_cart.length) {
                    set_alert(req, "One of the products or more were bought by another user in the meantime. They has been removed from your cart", "danger")
                    let to_remove = []
                    for (let i = 0; i < local_cart.length; i++){
                        let found = false;
                        for( let j = 0; j < result.length; j++ ){
                            if (local_cart[i] === result[j]){
                                found = true;
                                break;
                            }
                        }
                        if (!found){
                            to_remove.push(i)
                        }
                    }
                    for (let i in to_remove.reverse()){
                        req.session.cart.splice(i, 1);
                    }
                    res.redirect("/cart")
                } else {
                    sql = "DELETE FROM items WHERE item_no in (?)"
                    connection.query(sql, [local_cart], function (err, result, fields) {
                        if (err) set_alert(req, "DB error: " + err, "danger");
                        set_alert(req, "Purchase has been finalized", "success")
                        req.session.cart = []
                        res.redirect('/')
                    });
                }
            });
        })

    }


})

function reset_purchase(req) {
    req.session.cart = []
    set_alert(req, "Your cart has been cleared", "success")
}


module.exports = router;
