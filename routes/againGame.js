module.exports = function(app){
    app.get("/againGame", function(req, res){
        res.render("againGame", {content:"./againGame.ejs"});
    });

}