const Player = require("../public/models/Player");
const Token = require("../public/models/Token");

var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var x = "0";
var privateKey = "*(&duconha1minhvn21h";

module.exports = function(app){
    app.get("/game", function(req, res){
        res.render("game", {content:"./game.ejs"});
    });

    // tạo người chơi mới 
    app.post("/game/newPlayer", function(req, res){
        console.log("Post register");
        console.log( req.body );
        // Check avaible Username/Email
        Player.find({
            "$or": [{"NamePlayer":req.body.NamePlayer}]
        }, function(err, data){
            if(data.length==0){
                //luu nguoi choi moi

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.Password, salt, function(err, hash) {
                        if(err){
                            res.json({kq:false, errMsg:"Password encode error!"});
                        }else{

                            // Save user to Mongo Server
                            var newPlayer = Player({
                                NamePlayer: req.body.NamePlayer,
                                Password:   hash,
                                ID:req.body.Id,
                                Point:x,
                                Active: true,
                                RegisterDate: Date.now()
                            });

                            newPlayer.save(function(err){
                                if(err){
                                    res.json({kq:0, errMsg:"Mongo save user error"});
                                }else{
                                    res.json({kq:1, errMsg:"Player register successfully."});
                                }
                            });

                        }
                    });
                });
                
            }else{
                res.json({kq:0,errMsg:"Username is not availble."});
            }
        });
    });
    // update điểm
    app.post("/game/update", function(req, res){
        console.log( req.body );
        Player.findOneAndUpdate({NamePlayer:req.body.NamePlayer, ID:req.body.Id}, {
            NamePlayer: req.body.NamePlayer,
            ID:req.body.Id,
            Point:req.body.Point,
        }, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Upload successfully."});
            }
        });
    });

    // lấy danh sách 
    app.post("/game/pointList", function(req, res){
        Player.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, PointList:data});
            }
        });
    });

    //login
    app.post("/game/login",function(req,res){
        if(!req.body.NamePlayer|| !req.body.Password)
        {
            return res.json({kq:0, errMsg:"Name is not availble."});
        }else{
            Player.findOne({NamePlayer:req.body.NamePlayer},function(err,player){
                if(player==null){
                    return res.json({kq:0, errMsg:"Name player is not register"});
                }else{
                    bcrypt.compare(req.body.Password,player.Password,function(err,resPlayer){
                        if(err){
                            res.json({kq:0, errMsg:"loi roi: "+err});
                        }else{
                            if(resPlayer === true){
                                //Login thanh cong
                                jwt.sign(
                                 {  IdUser: player._id,
                                    NamePlayer: player.NamePlayer,
                                    ID:player.ID,
                                    Point:player.Point,
                                    Active: player.Active, 
                                    RegisterDate: Date.now()}, privateKey, {expiresIn:Math.floor(Date.now()/1000)+60*60*24*30*3}, function(err2, token){
                                 if(err2){
                                    res.json( {kq:0, errMsg:"token err"});
                                 }else{
                                     // Save Token
                                      var currenToken = Token({
                                         IDToken:player._id,
                                         Token: token,
                                         RegisterDate: Date.now(),
                                         State: true
                                     });

                                     currenToken.save(function(err){
                                         if(err){
                                             res.json({kq:0, errMsg:err});
                                         }else{
                                             res.json({kq:1, errMsg:"Token register successfully." ,Token:token});
                                         }
                                     });
                                 }
                             });
                             }else{
                                return res.json({kq:0, errMsg:" Password is not invalin"});
                             }
                        }
                    });
                }
            });   
        }   
    });
    

    app.post("/game/verifyToken", function(req, res){
        Token.findOne({Token:req.body.Token, State:true}).select("_id").lean().then(result=>{
            if(!result){
                res.json({kq:1, errMsg:"Error Token"});
            }else{
    
                jwt.verify(req.body.Token, privateKey, function(err, decoded) {
                    if(!err && decoded !== undefined ){
                        res.json({kq:1, Player:decoded});
                    }else{
                        res.json({kq:0, errMsg:"Token loi."});
                    }
                });
            }
        });    
    });

    app.post("/game/logout", function(req, res){
        Token.updateOne({Token:req.body.Token},{State:false}, function(err){
            if(err){
                res.json({kq:0, errMsg:"Logout error."});
            }else{
                res.json({kq:1, errMsg:"Logout successfully."});
            }
        });
    });
}

