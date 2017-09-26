var Teams = require('../models/teams');

module.exports = function(router) {

    router.put('/food/update/:id', function(req, res){
        var id = req.params.id;
        Teams.findOne({_id: id}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundObject){
                    res.status(404).send();
                }else{
                    
                    var fod = new Object();

                    if(req.body.name){
                        fod.name = req.body.name;
                    }
                    if(req.body.dish){
                        fod.dish = req.body.dish;
                    }
                    if(req.body.type){
                        fod.type = req.body.type;
                    }
                
                    foundObject.food.push(fod);

                    foundObject.save(function(err, updatedObject) {
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            res.send("Food Item Created!");
                            console.log("Food Item Created!");
                        }
                    });
                }
            }
        });
    });

    router.delete('/food/delete/:pid/:cid',function(req,res){
        var pid = req.params.pid;
        var cid = req.params.cid;

        Teams.findOne({_id: pid}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                foundObject.food.id(cid).remove();
                foundObject.save(function(err, updatedObject) {
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send("Food Item Deleted!");
                        console.log("Food Item Deleted!");
                    }
                });
            }          
        });
    });

    router.delete('/theme/delete/:pid/:cid',function(req,res){
        var pid = req.params.pid;
        var cid = req.params.cid;

        Teams.findOne({_id: pid}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                foundObject.theme[0].supplies.id(cid).remove();
                foundObject.save(function(err, updatedObject) {
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send("Theme Supply Item Deleted!");
                        console.log("Theme Supply Item Deleted!");
                    }
                });
            }          
        });
    });

    router.delete('/tickets/attending/delete/:pid/:cid',function(req,res){
        var pid = req.params.pid;
        var cid = req.params.cid;

        Teams.findOne({_id: pid}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                foundObject.tickets[0].attending.id(cid).remove();
                foundObject.save(function(err, updatedObject) {
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send("Theme Supply Item Deleted!");
                        console.log("Theme Supply Item Deleted!");
                    }
                });
            }          
        });
    });

    router.delete('/tickets/available/delete/:pid/:cid',function(req,res){
        var pid = req.params.pid;
        var cid = req.params.cid;

        Teams.findOne({_id: pid}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                foundObject.tickets[0].available.id(cid).remove();
                foundObject.save(function(err, updatedObject) {
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send("Theme Supply Item Deleted!");
                        console.log("Theme Supply Item Deleted!");
                    }
                });
            }          
        });
    });
    
    router.put('/tickets/update/:id', function(req, res){
        var id = req.params.id;
        Teams.findOne({_id: id}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundObject){
                    res.status(404).send();
                }else{
                    var tix = new Object();
                    tix.attending = req.body.attending;
                    tix.available = req.body.available;

                    foundObject.tickets.push(tix);

                    foundObject.save(function(err, updatedObject) {
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            res.send(updatedObject);
                        }
                    });
                }
            }
        });
    });

    router.put('/tickets/available/update/:id', function(req, res){
        var id = req.params.id;
        Teams.findOne({_id: id}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundObject){
                    res.status(404).send();
                }else{
                    var av = new Object();
                    av.name = req.body.name;
                    av.phone = req.body.phone;

                    foundObject.tickets[0].available.push(av);

                    foundObject.save(function(err, updatedObject) {
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            res.send(updatedObject);
                        }
                    });
                }
            }
        });
    });

    router.put('/tickets/attending/update/:id', function(req, res){
        var id = req.params.id;
        Teams.findOne({_id: id}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundObject){
                    res.status(404).send();
                }else{
                    var att = new Object();
                    att.name = req.body.name;
                    att.phone = req.body.phone;

                    foundObject.tickets[0].attending.push(att);

                    foundObject.save(function(err, updatedObject) {
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            res.send(updatedObject);
                        }
                    });
                }
            }
        });
    });
    
    router.put('/theme/update/:id', function(req, res){
        var id = req.params.id;
        Teams.findOne({_id: id}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundObject){
                    res.status(404).send();
                }else{

                    var them = new Object();
                    them.name = req.body.name;
                    them.desc = req.body.desc;
                    them.supplies = req.body.supplies;

                    foundObject.theme.push(them);

                    foundObject.save(function(err, updatedObject) {
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            res.send(updatedObject);
                        }
                    });
                }
            }
        });
    });
    
    router.put('/theme/supplies/update/:id', function(req, res){
        var id = req.params.id;
        Teams.findOne({_id: id}, function(err, foundObject){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundObject){
                    res.status(404).send();
                }else{

                    var supp = new Object();
                    supp.name = req.body.name;

                    foundObject.theme[0].supplies.push(supp);

                    foundObject.save(function(err, updatedObject) {
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            res.send(updatedObject);
                        }
                    });
                }
            }
        });
    });
    
    router.post('/teams', function(req, res){
        var team = new Teams();
        team.name = req.body.name;
        team.color = req.body.color;
        team.secondColor = req.body.secondColor;
        team.icon = req.body.icon;
        team.gdate = req.body.gdate;
        team.gtime = req.body.gtime;

        team.save(function(err){
            if(err){
                res.send("Game error: "+err);
            }else{
                res.send("Game Created!");
            }
        });
    });
    
    router.get('/teams', function(req, res){
        Teams.find(function(err, foundObject) {
            if(err){
                res.json(err);
            }else{
                res.json(foundObject);
            }
        });
    });

	return router;
}