var express =  require('express');
var path = require('path');
var hbs = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
var home = require('./routers/home');
var details = require('./routers/details');

app.set('port', (process.env.PORT || 3005))
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('hbs', hbs({extname:'hbs', defaultLayout: 'main', layoutDir: __dirname + 'views/layout'}));
app.set('view engine', 'hbs');


app.use(express.static('public'));
app.use(express.static('./'));

app.set('views',  path.join(__dirname, 'views'));


    app.use(function(req, res, next){
  next();
});


app.get('/', function(req, res){
  res.redirect(302,'/home');
});


// function requireHTTPS(req, res, next) {
//     if (!req.secure) {
//         //FYI this should work for local development as well
//         var domain = "https://" + req.get("host");
//         // console.log(process.env["SSL_PORT"]);
//         if (process.env["SSL_PORT"]) {
//             domain = domain.replace(/:\d+$/, "");
//             domain += ":" + process.env["3000"];
//         }
//         return res.redirect(domain + req.url);
//     }
//     next();
// }

// app.use(requireHTTPS);


app.use('/home', home);
app.use('/details', details);
app.use('/search', home);


app.listen(app.get('port'), function(){
  console.log('App listening at port:', app.get('port') );
});
