const Player = require("../public/models/Player");
const Token = require("../public/models/Token");

var jwt = require("jsonwebtoken");
var privateKey = "0";
module.exports = function(app){
    app.get("/game", function(req, res){
        res.render("game", {content:"./game.ejs"});
    });

    
    app.post("/game/newPlayer", function(req, res){
        console.log("Post register");
        console.log( req.body );
        // Check avaible Username/Email
        Player.find({
            "$or": [{"NamePlayer":req.body.NamePlayer}]
        }, function(err, data){
            if(data.length==0){
                //luu nguoi choi moi
                var newPlayer = Player({
                    NamePlayer: req.body.NamePlayer,
                    ID:req.body.Id,
                    Point:privateKey,
                });
        
                newPlayer.save(function(err){
                    if(err){
                        res.json({kq:0, errMsg:"Mongo save user error"});
                    }else{
                        res.json({kq:1, errMsg:"Player register successfully."});
                    }
                });
            }else{
                res.json({kq:0,errMsg:"Username is not availble."});
            }
        });
    });
}

