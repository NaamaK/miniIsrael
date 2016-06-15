var express = require('express');
var app = express();
var exhibitAction = require('./exhibitController');
var attractionAction = require('./attractionController');
var port = process.env.PORT || 3000;

app.set('port', port);
app.use('/', express.static('./public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set("Content-Type", "application/json");
  next();
});

app.get('/ws/getExhibits', exhibitAction.getData);
app.get('/ws/getAttractions', attractionAction.getData);
//app.get('/exhibit', attractionAction.getData2);
app.get('/exhibit/:value', function(req,res) {
    //var value = req.params.value;
    //res.sendFile(`${__dirname}/inin.html`);
    res.send('<!DOCTYPE html>'+
          '<html>'+
                '<body>'+
                 '<h1>Wow!!!</h1>'+
             '</body>'+
          '</html><head>'+
             '</head>'+
          );
    console.log("hiiiii!");
});
    // function(req,res) {
    // // var attraction = req.params.specificAttraction;
    // // //res.sendFile(`${__dirname}/inin.html`);
    // // console.log("attraction"+attraction);
    // console.log("hi");
//});

app.listen(port);
console.log("service is listening on port "+ port);