const socket = io.connect('http://localhost:3000');
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); 

let clientBalls = [];

const player = new Player2(canvas.width, canvas.height);

socket.on('updatePlayers', players => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    playersFound = {};
    for(let id in array){
        if(clientBalls[id] === undefined && id !== socket.id){
            clientBalls[id] = new players (canvas.width,canvas.height);
        }
        playersFound[id] = true;
    }
    for(let id in clientBalls){
        if(!playersFound[id]){
            clientBalls[id].remove();
            delete clientBalls[id];
        }
    }
})
requestAnimationFrame();

socket.on('server', (data) => {
    var text = data.key;
    var id = data.id;

    $('.content ul').append(`
        <li><u>`+ id +`</u> : <b>`+ text +`</b></li>
    `)
})

// nhận danh sách từ server
  socket.on('online_list', (data)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let id in data){
      if(id!== socket.id && clientPlayer[id] === undefined){
        clientPlayer[i] = new Player(canvas.width, canvas.height);
      }
    }
  });

  // nhận tên từ server
  socket.on('name', (data)=>{
      $('#server_name').text(data)
  })

  // nhận gửi cho chính họ
  socket.on('server-only', (data)=>{
      var text = data.key;
      var id = data.id;

      $('.content ul').append(`
          <li><i>`+ id +`</i> : <b>`+ text +`</b></li>
      `)
  })