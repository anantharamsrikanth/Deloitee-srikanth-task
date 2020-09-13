var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listProducts', function (req, res) {
   fs.readFile( __dirname + "/" + "products.json", 'utf8', function (err, data) {
    var products =  JSON.parse(data);
    res.json( products['products'] );
   });
})


app.get('/getProduct/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "products.json", 'utf8', function (err, data) {
    var products= JSON.parse(data); 
    var product = products.products.find(x => x.slug === req.params.id);
    console.log(product);
    res.json( product );
    });
 })

app.get('/filterProducts', function (req, res) {
   fs.readFile( __dirname + "/" + "products.json", 'utf8', function (err, data) {
    console.log(req.query);
    var products =  JSON.parse(data);
    var filteredProducts = products.products.filter(function (el) {
    return el.price > req.query.minvalue &&
         el.price < req.query.maxvalue;
    
   });
    res.json( filteredProducts );
    console.log(filteredProducts)
});
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})