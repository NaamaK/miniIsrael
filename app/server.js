var express = require('express');
var path = require('path');
var app = express();


app.use('/', express.static('./public')).listen(8080);
app.route('/xhibit.html/:num').get(function(req, res) { 
    return res.sendFile('./public/xhibit.html', {root: __dirname}); 
    // return res.sendFile(path.join(config.root, 'xhibit.html')); 
});
console.log("client is listening to port 8080..");