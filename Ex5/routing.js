const express = require('express');
const router = express.Router()
const mysql = require('mysql');



router.get('/', (req, res) => {
    console.log(req.session)
    let result = [];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'aia_test_user',
        password: 'FSAfewa4fw83;',
        database: 'aia_assignments'
    })
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected to database")
    })
    let alertText = req.session.alert;
    res.render("index", {"alert": alertText, "list": result});
})


// Access the session as req.session
router.get('/carr', (req, res) => {
    res.render("cart", {"alert": req.session.alert, "cartList": req.session.cart})
})

router.post('/', (req, res) => {
    var manga = {
        _id: req.body.mangaId,
        name: req.body.mangaName
    }
    // console.log(manga)

    if (!req.session.cart) {
        req.session.cart = []
    }

    var isInCart = false
    req.session.cart.forEach(element => {
        if (element._id == manga._id) {
            isInCart = true
        }
    });
    if (isInCart == false) {
        req.session.cart.push(manga)
    } else {
        console.log("Element jest juz w koszyku")
    }

    res.redirect('index')
})

router.post('/remove', (req, res) => {
    var manga = {
        _id: req.body.mangaId,
        name: req.body.mangaName
    }

    var index = 0
    req.session.cart.forEach(element => {
        // console.log(element._id)
        if (element._id == manga._id) {
            req.session.cart.splice(index, 1)
        }
        index++
    });
    res.redirect('shoppingCart')
})

router.get('/cancelCart', (req, res) => {
    req.session.cart = []
    isCancel = true
    res.redirect('index')
})

router.get('/finalizeOrder', (req, res) => {

    // console.log(req.session.cart)
    var MongoClient = require('mongodb').MongoClient

    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err

        var db = client.db('myproject')

        req.session.notBougth = []
        req.session.cart.forEach(element => {
            // console.log('ForEach: ', element)

            db.collection("mangas").deleteOne({_id: ObjectId(element._id)}, function (err, obj) {
                if (err) throw err;
                console.log(obj.result.n + " document(s) deleted");
                if (obj.result.n != 1) {
                    console.log("Produkt jest niedstepny: " + element.name)
                    isNotBought = true
                    whatIsNotBought += element.name + ", "
                    whatIsNotBoughtList.push(element)
                }
            });

        });

        isBought = true
        req.session.cart = []
        res.redirect('index')
    })
})

module.exports = router;

// module.exports = {
//     "app": app,
//     "router": router,
// }


