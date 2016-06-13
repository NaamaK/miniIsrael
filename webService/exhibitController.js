var mongoose = require('mongoose');
var Exhibit = require('./exhibit');

exports.getData = function(req,res) {
	Exhibit.find({}).
	where("name").ne("PRIVATE").
	exec(function(err,docs) {
		res.json(docs);
		return;
	});
};