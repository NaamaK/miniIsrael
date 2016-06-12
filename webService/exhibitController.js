var mongoose = require('mongoose');
var Action = require('./exhibit');

exports.getData = function(req,res) {
	Action.find({}).
	exec(function(err,docs) {
		res.json(docs);
		return;
	});
};