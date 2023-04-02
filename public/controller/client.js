
$(document).ready(function(){
    var socket = io();

    socket.on('name', (data)=>{
        $('#Id').val(data)
    });
    var url = "http://localhost:3000";

    $("#btnStar").click(function(){
        if($("#namePlayer").val().length==0 ){
            alert("Vui long nhap name");
        }else{
            $.post(url + "/game/newPlayer", {
                NamePlayer:$("#namePlayer").val(),
                Id:$("#Id").val()    
            }, function(data){
                if(data.kq == 1){
                    alert(data.errMsg);
                    document.location.href='/index';
                }else{
                    alert(data.errMsg);
                }
            });
        }
    });
})

