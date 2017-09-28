var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var MatchSchema = new Schema({
	team1: String,
	team2: String
});

var OGamesSchema = new Schema({
	name: String,
	status: String,
	champion: String,
	rounds: {type: [MatchSchema]}
});

OGamesSchema.pre('save', function(next) {
	var ogames = this;
	next();
});

module.exports = mongoose.model('OGames', OGamesSchema); // Export User Model for us in API