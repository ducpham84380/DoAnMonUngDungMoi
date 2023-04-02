const socket = io.connect('http://localhost:3000');

        socket.on('name', (data)=>{
            $('#Id').val(data)
        });

$(document).ready(function(){
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

                    this.href += 'index';
                }else{
                    alert(data.errMsg);
                }
            });
        }
    });
})

