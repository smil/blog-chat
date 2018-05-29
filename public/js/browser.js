    var content = document.getElementById("content"), textarea = document.getElementById('message'),
    userName = document.getElementById('userName'), btn = document.getElementById('send');
    content.style.height = (document.documentElement.clientHeight) + 'px';

    var connection = new WebSocket('ws:' + window.location.href.substring(window.location.protocol.length));

    connection.onopen = function () {
        
    };
    connection.onmessage = function (data) {

      var message = JSON.parse(data.data);
      var div = document.createElement("div");
      if(message.userName == userName.innerHTML){
        div.className = "clearfix my-message"
      }else{
        div.className = "other-message";
      }

      for(var item in message){
        var p = document.createElement("p");
        p.className = item;
        p.innerHTML = message[item]
        div.appendChild(p);  
      }

      

      content.appendChild(div);  
    };

    btn.onclick = function() {
        if (!textarea.value)return;
        connection.send(JSON.stringify({name: userName.innerHTML, text: textarea.value}));
        textarea.value = '';
    };


