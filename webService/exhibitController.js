var mongoose = require('mongoose');
var Exhibit = require('./exhibit');

exports.getData = function(req,res) {
	Exhibit.find({}).
	exec(function(err,docs) {
		res.json(docs);
		return;
	});
};