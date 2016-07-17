var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exhibitAction = require('./exhibitController');
var attractionAction = require('./attractionController');
var userAction = require('./userController');
var port = process.env.PORT || 3000;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('./public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set("Content-Type", "application/json");
  next();
});

app.get('/ws/getExhibits', exhibitAction.getData);
app.get('/ws/getAttractions', attractionAction.getData);
app.post('/ws/saveUser', userAction.addUser);
app.post('/ws/addLike', userAction.addLike);
app.post('/ws/addWatched', userAction.addWatched);
app.post('/ws/isLiked', userAction.isLiked);
app.get('/xhibit/:specificExhibit', function(req,res) {
  var exhibit = req.params.specificExhibit;
  exhibitAction.getSpecific(exhibit,req,res);
});

app.listen(port);
console.log("service is listening on port "+ port);