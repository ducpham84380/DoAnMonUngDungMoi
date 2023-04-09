$(document).ready(function(){
    var url = "http://localhost:3000";

    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    var point = document.getElementById("point");
    var name = document.getElementById("name");
    point.innerHTML += qs["score"];
    name.innerHTML += qs["name"];


    $("#btnHome").click(function(){
        if(qs["name"].length==0 || qs["score"].length==0 ){
            alert("lỗi");
        }else{
            $.post(url + "/game/update", {
                    NamePlayer:qs["name"],
                    Point:qs["score"],
                    Id:qs["Id"]
            }, function(data){
                if(data.kq == 1){
                    alert(data.errMsg);
                    document.location.href='/client';
                }else{
                    alert(data.errMsg);
                }
            });
        }
    });

    $("#btnAgain").click(function(){
        if(qs["name"].length==0 || qs["score"].length==0 ){
            alert("lỗi");
        }else{
            $.post(url + "/game/update", {
                    NamePlayer:qs["name"],
                    Point:qs["score"],
                    Id:qs["Id"]
            }, function(data){
                if(data.kq == 1){
                    alert(data.errMsg);
                    document.location.href='/index?name='+qs["name"]+'&Id='+qs["Id"];
                }else{
                    alert(data.errMsg);
                }
            });
        }
    });

})