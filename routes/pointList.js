module.exports = function(app){
    app.get("/pointList", function(req, res){
        res.render("pointList", {content:"./pointList.ejs"});
    });
    
}