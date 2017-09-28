var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var OTeamsSchema = new Schema({
	country: String,
	member1: String,
	member2: String,
	wins: Number
});

OTeamsSchema.pre('save', function(next) {
	var oteams = this;
	next();
});

module.exports = mongoose.model('OTeams', OTeamsSchema); // Export User Model for us in API