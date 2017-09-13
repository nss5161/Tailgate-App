var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var GameSchema = new Schema({
	team: [
		{
			name: String,
			color: String,
			secondColor: String,
			icon: String,
			gdate: String,
			gtime: String,
			gameinfo: [
				{
					food: [
						{
							name: String,
							dish: String,
							type: String
						}
					]
				},
				{
					tickets: [
						{
							attending: [
								{
									name: String,
									phone: String
								}
							]
						},
						{
							available: [
								{
									name: String,
									phone: String
								}
							]
						}
					]
				},
				{
					theme:[
						{
							name: String,
							desc: String,
							supplies:[
								{
									name: String
								}
							]
						}
					]
				}
			]
		}
	]
});

GameSchema.pre('save', function(next) {
    var game = this;
    next();
});

module.exports = mongoose.model('Game', GameSchema); // Export User Model for us in API
