var express = require('express');
var router = express.Router();
var concat = require('concat-stream');
var https = require('https');
var env = require('dotenv').config();


router.get("/", function(req, resp, next){
    getData(receiveData, '');

    function receiveData(data){
        console.log(data.artObjects.webImage);
     resp.render('home',{data:data});
    }
});


router.post("/", function(req, resp){

  getData(receiveData, req.body.search.value);

    function receiveData(data){

     resp.render('home',{data:data});

    }
});


function getData(recieve, value){

    https.get('https://www.rijksmuseum.nl/api/nl/collection/?key=LTaH2LtF&format=json&q='+value, function (res) {
    res.pipe(concat(callback));

    function callback(argument) {

      var data = JSON.parse(argument);
      recieve(data);

    }
  });
}

module.exports = router;

