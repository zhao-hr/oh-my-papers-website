console.log("Prgram Starts")

document.getElementById("button").addEventListener("click", recommend);
document.addEventListener("keypress", BindEnter)
function BindEnter(obj){ 
    if (obj.keyCode === 13) recommend()
};

var socket;
var ws = new WebSocket("ws://127.0.0.1:10086/test");
socket = ws;
ws.onopen = function() {
    console.log('Connected Successfully');
};
ws.onmessage = function(evt) {
    var received_msg = evt.data;
    console.log('Receive \'' + received_msg + '\' from Server');
    document.getElementById("output").innerHTML=received_msg;
};
ws.onclose = function() {
    console.log('Connection Closed');
};


function recommend(){
    var input = document.getElementById("input").value
    if (input != ""){
        console.log('Send \'' + input + '\' to Server')
        socket.send(input)
    }
}

