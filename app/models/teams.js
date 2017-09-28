var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var FoodSchema = new Schema({
	name: String,
	dish: String,
	type: String
});

var AttendingSchema = new Schema({
	name: String,
	phone: String
});

var AvailableSchema = new Schema({
	name: String,
	phone: String
});

var TicketsSchema = new Schema({
	attending: {type: [AttendingSchema], default:[]},
	available: {type: [AvailableSchema], default:[]}
});

var SuppliesSchema = new Schema({
	name: String
});

var ThemeSchema = new Schema({
	name: String,
	desc: String,
	supplies: {type: [SuppliesSchema], default:[]}
});

var TeamsSchema = new Schema({
	name: String,
	color: String,
	secondColor: String,
	icon: String,
	gdate: String,
	gtime: String,
	food: {type: [FoodSchema], default: []},
	tickets: {type: [TicketsSchema], default:[]},
	theme: {type: [ThemeSchema], defualt:[]}
});

FoodSchema.pre('save', function(next) {
    var food = this;
    next();
});

AttendingSchema.pre('save', function(next) {
	var attending = this;
	next();
});

AvailableSchema.pre('save', function(next) {
	var available = this;
	next();
});

TicketsSchema.pre('save', function(next) {
	var tickets = this;
	next();
});

ThemeSchema.pre('save', function(next) {
	var theme = this;
	next();
});

SuppliesSchema.pre('save', function(next) {
    var supplies = this;
    next();
});

TeamsSchema.pre('save', function(next) {
	var teams = this;
	next();
});

module.exports = mongoose.model('Food', FoodSchema);
module.exports = mongoose.model('Attending', AttendingSchema);
module.exports = mongoose.model('Available', AvailableSchema);
module.exports = mongoose.model('Tickets', TicketsSchema);
module.exports = mongoose.model('Supplies', SuppliesSchema);
module.exports = mongoose.model('Theme', ThemeSchema);
module.exports = mongoose.model('Teams', TeamsSchema); // Export User Model for us in API