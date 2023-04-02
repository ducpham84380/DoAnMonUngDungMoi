

module.exports = function(app){
    app.get("/client", function(req, res){
        res.render("client", {content:"./client.ejs"});
    });

}