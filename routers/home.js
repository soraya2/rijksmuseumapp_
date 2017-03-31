var express = require('express');
var router = express.Router();
var concat = require('concat-stream');
var https = require('https');
var env = require('dotenv').config();

var imgURL = [];
router.get("/", function(req, resp, next){
    getData(receiveData, '');

 function receiveData(data){
        // var hello = data.artObjects.map(function(object){
        //   console.log(object.webImage.url.replace('http', 'https'));
        //   var imageUrl = object.webImage.url.replace('http', 'https');
        //   imgURL.push(imageUrl);
        //   return imageUrl;

        // });

        console.log(imgURL);


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

