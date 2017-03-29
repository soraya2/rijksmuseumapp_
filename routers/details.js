var express = require('express');
var router = express.Router();
var concat = require('concat-stream');
var https = require('https');
var env = require('dotenv').config();


router.get("/:id", function(req, res, next){

  getData(receiveData, req.params.id);

  function receiveData(data){

    function imageCheck(){
        console.log(data.artObject.webImage);
        if (data.artObject.webImage !== null) {

          return data.artObject.webImage.url;

        }else{

          return'/images/background_black.svg';

        }
    }

  res.render('details',{data:data.artObject, image: imageCheck()});

  }
});


function getData(recieve,id){

  var url = 'https://www.rijksmuseum.nl/api/nl/collection/'+ id +'?key=' + process.env.API_KEY + '&format=json';

  https.get(url, function (res) {

  res.pipe(concat(callback));

    function callback(argument) {

      var data = JSON.parse(argument);

      recieve(data);

    }
  });
}

module.exports = router;
