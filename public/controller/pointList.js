
$(document).ready(function(){
    var url = "http://localhost:3000";

    $.post(url + "/game/pointList", function(data){
        $("#tbodyPoint").html("");
        if(data.kq==1){
            data.PointList.forEach(function(player){
                $("#tbodyPoint").append(`<tr></th><td> `+player.NamePlayer+`</td> <td>`+player.Point+`</td> </tr>`);
            });
        }
    });
});