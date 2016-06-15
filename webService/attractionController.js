var mongoose = require('mongoose');
var Attraction = require('./attraction');

exports.getData = function(req,res) {
    Attraction.find({}).
    exec(function(err,docs) {
        res.json(docs);
        return;
    });
};

// exports.getData2 = function(req,res) {
//     console.log("hiiiii!");
// };