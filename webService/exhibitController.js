var mongoose = require('mongoose');
var Exhibit = require('./exhibit');

exports.getData = function(req,res) {
	Exhibit.find({}).
	exec(function(err,docs) {
		res.json(docs);
		return;
	});
};

exports.getSpecific = function(name,req,res) {
	Exhibit.find({}).
	where('name').equals(name).
	exec(function(err,docs) {
		res.json(docs);
		console.log(docs);
		return;
	});
};