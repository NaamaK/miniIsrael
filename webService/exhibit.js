var mongoose = require('mongoose');
var schema = mongoose.Schema;

var exhibitSchema = new schema({
	name:  {type:String, index:1, required:true, unique:true},
	where: String,
	when:  String,
	size:  String,
	info:  String,
	image: String,
	video: String,
	attractions: [Number]
}, {collection: 'exhibits'});

var Exhibit = mongoose.model('Exhibit', exhibitSchema);

module.exports = Exhibit;