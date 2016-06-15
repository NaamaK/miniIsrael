var mongoose = require('mongoose');
var schema = mongoose.Schema;

var attractionSchema = new schema({
    name:  {type:String, index:1, required:true, unique:true},
    hours: String,
    date:  String,
    image: String,
    info:  String,
    exhibits: [String]
}, {collection: 'attractions'});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;