var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));

var fs = require("fs");
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.io = io;
server.listen(3000);

io.on("connection",function(socket){
    console.log("new connection"+ socket.id);
    // thêm người online vào mảng
    array.push(socket.id);
    // Gửi tên của chính người đó ra ngoài
    socket.emit('name', socket.id);
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

fs.readFile("./config.json", "utf8", function(err, data){
    if(err){ throw err };
    var obj = JSON.parse(data);
    //mongodb+srv://<username>:<password>@cluster0.a8gqm.mongodb.net/?retryWrites=true&w=majority
    // kết nối CSDL mongooseDB
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://'+obj.mongoose.username+':'+obj.mongoose.password+'@'+obj.mongoose.server+'/'+obj.mongoose.dbname+'?retryWrites=true&w=majority',function(err){
        if(err)
        {
            console.log("DataBase khong ket noi: "+ err);
        }
        else{
            console.log("DataBase ket noi thanh cong");
        }
    });
    mongoose.set('strictQuery', false);
    mongoose.set('strictQuery', true);
    // 
    
});