module.exports = function(app){
    app.get("/viewPoint", function(req, res){
        res.render("viewPoint", {content:"./viewPoint.ejs"});
    });
    
}