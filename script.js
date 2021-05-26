console.log("Prgram Starts");

input = document.getElementById("input");
button = document.getElementById("button");
output = document.getElementById("output");
var paper = new Array(10);
var paper_title = new Array(10);
var paper_author = new Array(10);
var paper_venue = new Array(10);
var paper_year = new Array(10);
var paper_abstract = new Array(10);
for (var i = 0; i < 10; ++i){
    paper[i] = document.getElementById("paper"+i);
    paper_title[i] = document.getElementById("paper"+i+"_title");
    paper_author[i] = document.getElementById("paper"+i+"_author");
    paper_venue[i] = document.getElementById("paper"+i+"_venue");
    paper_year[i] = document.getElementById("paper"+i+"_year");
    paper_abstract[i] = document.getElementById("paper"+i+"_abstract");
    paper[i].style.display="none";
}

button.addEventListener("click", recommend);
document.addEventListener("keypress", BindEnter);
function BindEnter(obj){ 
    if (obj.keyCode === 13) recommend();
};


var socket;
var ws = new WebSocket("ws://127.0.0.1:10086/test");
socket = ws;
ws.onopen = function() {
    console.log('Connected Successfully');
};

ws.onmessage = function(evt) {
    var received_msg = evt.data;
    var obj = JSON.parse(received_msg);
    console.log('Receive \'' + received_msg + '\' from Server');
    for (i=0; i<10; ++i){
        if (obj[i] != undefined) {
            paper_title[i].innerHTML = obj[i].title;
            paper_author[i].innerHTML = obj[i].author;
            paper_venue[i].innerHTML = obj[i].venue;
            paper_year[i].innerHTML = obj[i].year;
            paper_abstract[i].innerHTML = obj[i].abstract;
            paper[i].style.display="";
        } else {
            for (j=i; j<10; ++j)
                paper[j].style.display="none";
            break;
        }
    }
};

ws.onclose = function() {
    console.log('Connection Closed');
};


function recommend(){
    var input_value = input.value;
    if (input_value != ""){
        console.log('Send \'' + input_value + '\' to Server')
        socket.send(input_value)
    }
}
