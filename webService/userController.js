var mongoose = require('mongoose');
var User = require('./user');


exports.addUser = function(req,res) {

	var newUser = new User({
		likes: [],
		watched: [],
		name: req.body.name,
		email: req.body.email,
		token: "555"
	});

	User.count({email: newUser.email}, function(err,count) {
		// user already exists in db
		if (count > 0) console.log("user `" + newUser.name + "` already exists!");
		else {
			newUser.save(function(err, doc) {
				if(err) console.log(err);
				else {
					console.log("\nSaved::" + doc);
					res.json();
					mongoose.disconnect();
				}
			});
		}
	});
};

exports.addLike = function(req,res) {

	var userEmail = req.body.email;
	var likedExhibit = req.body.like;
	var isLiked = false;

	User.findOne({email: userEmail}, function(err,doc) {
		// user already exists in db
		if (doc != null) {
			doc.likes.forEach(function (d) {
				if (d === likedExhibit && !isLiked) isLiked = true;
			});
			if (isLiked) {
				doc.update({
					$pull: {likes: likedExhibit}
				}).exec(function(err, res) {
					mongoose.disconnect();
				});
			}else{
				doc.update({
					$push: {likes: likedExhibit}
				}).exec(function(err, res) {
					mongoose.disconnect();
				});
			}
			res.status(200).json({'status' : "OK"});
		}
		else {
			console.log("user with email `" + userEmail + "` doesn`t exist!");
			res.status(400).json({'status' : "Error! user with email `" + userEmail + "` doesn`t exist!"});
		}
	});
};

exports.addWatched = function(req,res) {

	var userEmail = req.body.email;
	var watchedExhibit = req.body.watched;
	var isWatched = false;

	User.findOne({email: userEmail}, function(err,doc) {
		// user already exists in db
		if (doc != null) {
			doc.watched.forEach(function (d) {
				if (d === watchedExhibit && !isWatched) isWatched = true;
			});
			if (!isWatched) {
				doc.update({
					$push: {watched: watchedExhibit}
				}).exec(function(err, res) {
					mongoose.disconnect();
				});
			}
			res.status(200).json({'status' : "OK"});
		}
		else {
			console.log("user with email `" + userEmail + "` doesn`t exist!");
			res.status(400).json({'status' : "Error! user with email `" + userEmail + "` doesn`t exist!"});
		}
	});
};