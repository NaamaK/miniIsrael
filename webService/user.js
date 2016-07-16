var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	likes: [String],
    watched: [String],
	name: String,
    email: {type:String, index:1, required:true, unique:true},
    token: String
}, {collection: 'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;