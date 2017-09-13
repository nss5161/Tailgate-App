/*
var Game = require('../models/game');

module.exports = function(router) {

	router.route('/game')

    .get(function(req, res) {
    	Game.find(function(err, game) {
    		if(err){
    			res.send(err);
    		}else{
    			res.json(game);
    		}
    	})
	});

	return router;
}
*/