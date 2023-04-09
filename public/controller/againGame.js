
$(document).ready(function(){
    var url = "http://localhost:3000";

    $("#btnStar").click(function(){
        if($("#namePlayer").val().length==0 ){
            alert("Vui long nhap name");
        }else{
            $.post(url + "/game/login", {
                NamePlayer:$("#namePlayer").val(),
                Password:$("#exampleInputPassword1").val()   
            }, function(data){
                if(data.kq == 1){
                    $.post(url + "/game/verifyToken", {
                        Token:data.Token, 
                    }, function(data2){
                        if(data.kq == 1){
                            alert("Đăng nhập thành công");
                            document.location.href='/index?name='+data2.Player.NamePlayer+'&Id='+data2.Player.ID;
                        }else{
                            alert(data2.errMsg);
                        }
                    });
                }else{
                    alert(data.errMsg);
                }
            });
        }
    });
})