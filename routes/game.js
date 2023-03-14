//import * as THREE from 'three';

module.exports = function(app){
    app.get("/", function(req, res){
        res.render("index", {content:"./index.ejs"});
    });
}

