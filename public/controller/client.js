
$(document).ready(function(){
    var url = "http://localhost:3000";
    var socket = io();
    var id;
    socket.on('name', (data)=>{
        $('#Id').val(data);
    });



    $("#btnStar").click(function(){
        if($("#namePlayer").val().length==0 ){
            alert("Vui long nhap name");
        }else{
            $.post(url + "/game/newPlayer", {
                NamePlayer:$("#namePlayer").val(),
                Id:$("#Id").val(),
                Password:$("#exampleInputPassword1").val()   
            }, function(data){
                if(data.kq == 1){
                    // $.post(url + "/game/login", {
                    //     NamePlayer:$("#namePlayer").val(),
                    //     Password:$("#exampleInputPassword1").val()   
                    // }, function(data){
                    //     if(data.kq == 1){
                    //         alert(data.errMsg);
                    //         document.location.href='/index?name='+$("#namePlayer").val()+'&Id='+$("#Id").val();
                    //     }else{
                    //         alert(data.errMsg);
                    //     }
                    // });
                    alert(data.errMsg);
                    document.location.href='/index?name='+$("#namePlayer").val()+'&Id='+$("#Id").val();
                }else{
                    alert(data.errMsg);
                }
            });
        }
    });
})

