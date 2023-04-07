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

var array=[];
io.on('connection', (socket)=>{
    console.log('Đã online : ' + socket.id)

    // thêm người online vào mảng
    array.push(socket.id)

    // Gửi tên của chính người đó ra ngoài
    socket.emit('name', socket.id);

    // 1. Gửi cho chính họ
    //socket.emit('name', data);

    // 2. Gửi qua cho một người khác
    //id người nhận, dữ liệu
    //io.to(id).emit('name', data);

    // 3. Gửi cho những người khác, trừ client gửi
    //socket.broadcast.emit('name', data);

    // 4. Gửi cho tất cả
    //io.sockets.emit('name', data);

    socket.on('client', (data)=>{
        //socket.emit('server', data);
        //socket.broadcast.emit('server', data);
        //io.sockets.emit('server', data);

        // dữ liệu của data lúc này là object
        io.to(data.radio).emit('server', {key: data.key, id: socket.id});
        socket.emit('server-only', {key: data.key, id: socket.id});
    })

    // ngắt kết
    socket.on('disconnect', ()=>{
        console.log('Đã thoát : ' + socket.id)

        // Xóa người logout
        array.splice(array.indexOf(socket.id), 1)
    })

    // Gửi danh sách ra cho tất cả
    io.sockets.emit('online_list', array);
});




var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

fs.readFile("./config.json", "utf8", function(err, data){
    if(err){ throw err };
    var obj = JSON.parse(data);
    //mongodb+srv://ItachiUchiha:<password>@cluster0.a8gqm.mongodb.net/?retryWrites=true&w=majority
    // kết nối CSDL mongooseDB
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', false);
    mongoose.set('strictQuery', true);
        mongoose.connect('mongodb+srv://'+obj.mongoose.username+':'+obj.mongoose.password+'@'+obj.mongoose.server+'/'+obj.mongoose.dbname+'?retryWrites=true&w=majority',function(err){
        if(err)
        {
            console.log("DataBase khong ket noi: "+ err);
        }
        else{
            console.log("DataBase ket noi thanh cong");
        }
    });
    // 
   
    require("./routes/game")(app);
    require("./routes/client")(app);
    require("./routes/index")(app);
});


