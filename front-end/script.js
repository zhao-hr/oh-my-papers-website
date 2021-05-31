console.log("Prgram Starts");

var server_connected = 0;

var fun = 1
var fun1 = document.getElementById("fun1");
var fun2 = document.getElementById("fun2");
var page1 = document.getElementById("page1")
var page2 = document.getElementById("page2")
page1.style.display="";
page2.style.display="none";

var input = document.getElementById("input");
var button = document.getElementById("button");
var output = document.getElementById("output");
var searching = document.getElementById("searching");
searching.style.display="none";
var paper = new Array(10);
var paper_title = new Array(10);
var paper_author = new Array(10);
var paper_venue = new Array(10);
var paper_year = new Array(10);
var paper_abstract = new Array(10);
var paper_relate = new Array(10);
var record_id = new Array(10);
for (var i = 0; i < 10; ++i){
    paper[i] = document.getElementById("paper"+i);
    paper_title[i] = document.getElementById("paper"+i+"_title");
    paper_author[i] = document.getElementById("paper"+i+"_author");
    paper_venue[i] = document.getElementById("paper"+i+"_venue");
    paper_year[i] = document.getElementById("paper"+i+"_year");
    paper_abstract[i] = document.getElementById("paper"+i+"_abstract");
    paper_relate[i] = document.getElementById("paper"+i+"_search");
    paper[i].style.display="none";
}

var input2 = document.getElementById("input2");
var button2 = document.getElementById("button2");
var output2_1 = document.getElementById("output2_1");
var output2_2 = document.getElementById("output2_2");
var output_box = document.getElementById("output_box2");
var searching2 = document.getElementById("searching2");
var searching3 = document.getElementById("searching3");
searching2.style.display="none";
searching3.style.display="none";
output_box.style.display="none";
var paper2 = new Array(10);
var paper_title2 = new Array(10);
var paper_author2 = new Array(10);
var paper_venue2 = new Array(10);
var paper_year2 = new Array(10);
var paper_abstract2 = new Array(10);
for (var i = 0; i < 10; ++i){
    paper2[i] = document.getElementById("paper"+i+"_2");
    paper_title2[i] = document.getElementById("paper"+i+"_title_2");
    paper_author2[i] = document.getElementById("paper"+i+"_author_2");
    paper_venue2[i] = document.getElementById("paper"+i+"_venue_2");
    paper_year2[i] = document.getElementById("paper"+i+"_year_2");
    paper_abstract2[i] = document.getElementById("paper"+i+"_abstract_2");
    paper2[i].style.display="none";
}

fun1.addEventListener("click", Page1);
fun2.addEventListener("click", Page2);
button.addEventListener("click", msg_send);
button2.addEventListener("click", msg_send);

paper_relate[0].addEventListener("click", relate_search0);
paper_relate[1].addEventListener("click", relate_search1);
paper_relate[2].addEventListener("click", relate_search2);
paper_relate[3].addEventListener("click", relate_search3);
paper_relate[4].addEventListener("click", relate_search4);
paper_relate[5].addEventListener("click", relate_search5);
paper_relate[6].addEventListener("click", relate_search6);
paper_relate[7].addEventListener("click", relate_search7);
paper_relate[8].addEventListener("click", relate_search8);
paper_relate[9].addEventListener("click", relate_search9);

document.addEventListener("keypress", BindEnter);
function BindEnter(obj) { if (obj.keyCode === 13) msg_send(); };
function Page1() { page1.style.display=""; page2.style.display="none"; fun = 1; };
function Page2() { page1.style.display="none"; page2.style.display=""; fun = 2; };


var socket;
var ws = new WebSocket("ws://127.0.0.1:10086/test");
socket = ws;
ws.onopen = function() { 
    console.log('Connected Successfully'); 
    server_connected = 1;
};
ws.onclose = function() { 
    console.log('Connection Closed'); 
    server_connected = 0;
};

ws.onmessage = function(evt) {
    var received_msg = evt.data;
    var obj = JSON.parse(received_msg);
    msg_display(obj)
};


function msg_display(obj) {
    if (obj["function"] == 1) {
        obj = obj['inference'][0]['result']
        console.log('Receive \'' + obj + '\' from Server');
        searching.style.display="none";
        for (i=0; i<10; ++i){
            if (obj[i] != undefined) {
                paper_title[i].innerHTML = obj[i].title;
                paper_author[i].innerHTML = obj[i].author;
                paper_venue[i].innerHTML = obj[i].venue;
                paper_year[i].innerHTML = obj[i].year;
                paper_abstract[i].innerHTML = obj[i].abstract;
                record_id[i] = obj[i].id;
                paper[i].style.display="";
            } else {
                for (j=i; j<10; ++j)
                    paper[j].style.display="none";
                break;
            }
        }
    } else if (obj["function"] == 2) {
        console.log('Receive \'' + obj + '\' from Server');
        output2_1.innerHTML = obj["context"];
        obj = obj['references'];
        output2_1.style.display="";
        output_box.style.display="";
        searching2.style.display="none";
        searching3.style.display="none";
        for (i=0; i<10; ++i){
            if (obj[i] != undefined) {
                j = i+1;
                paper_title2[i].innerHTML = "[" + j + "] " + obj[i].title;
                paper_author2[i].innerHTML = obj[i].author;
                paper_venue2[i].innerHTML = obj[i].venue;
                paper_year2[i].innerHTML = obj[i].year;
                paper_abstract2[i].innerHTML = obj[i].abstract;
                paper2[i].style.display="";
            } else {
                for (j=i; j<10; ++j)
                    paper2[j].style.display="none";
                break;
            }
        }
    } else {
        console.log('Receive \'' + obj + '\' from Server');
        obj = obj["result"];
        searching.style.display="none";
        for (i=0; i<10; ++i){
            if (obj[i] != undefined) {
                paper_title[i].innerHTML = obj[i].title;
                paper_author[i].innerHTML = obj[i].author;
                paper_venue[i].innerHTML = obj[i].venue;
                paper_year[i].innerHTML = obj[i].year;
                paper_abstract[i].innerHTML = obj[i].abstract;
                record_id[i] = obj[i].id;
                paper[i].style.display="";
            } else {
                for (j=i; j<10; ++j)
                    paper2[j].style.display="none";
                break;
            }
        }
    }
}


function msg_send(){    
    if (server_connected == 0) {
        alert("Server Unconnected!");
        return;
    }

    console.log(fun2);
    
    if (fun == 1) {
        var input_value = input.value;
        if (input_value != ""){
            var obj = {"function": 1, "inference": []};
            obj["inference"].push({"context": input_value});
            obj_string = JSON.stringify(obj);
            console.log('Send \'' + obj_string + '\' to Server');

            searching.style.display="";
            for (var i=0; i<10; ++i) paper[i].style.display="none";
            
            socket.send(obj_string);
        }
    } else {
        var input_value = input2.value;
        if (input_value != ""){
            var obj = {"function": 2, "context": input_value};
            obj_string = JSON.stringify(obj);
            console.log('Send \'' + obj_string + '\' to Server');

            searching2.style.display="";
            searching3.style.display="";
            
            output2_1.style.display="none";
            output_box.style.display="none";
            for (var i=0; i<10; ++i) paper2[i].style.display="none";

            socket.send(obj_string)
        }
    }
}

function relate_search0() {
    var obj = {"function": 3, "id": record_id[0]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";

    socket.send(obj_string);
}

function relate_search1() {
    var obj = {"function": 3, "id": record_id[1]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search2() {
    var obj = {"function": 3, "id": record_id[2]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search3() {
    var obj = {"function": 3, "id": record_id[3]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search4() {
    var obj = {"function": 3, "id": record_id[4]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search5() {
    var obj = {"function": 3, "id": record_id[5]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search6() {
    var obj = {"function": 3, "id": record_id[6]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search7() {
    var obj = {"function": 3, "id": record_id[7]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search8() {
    var obj = {"function": 3, "id": record_id[8]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}

function relate_search9() {
    var obj = {"function": 3, "id": record_id[9]};
    obj_string = JSON.stringify(obj);
    console.log('Send \'' + obj_string + '\' to Server');

    searching.style.display="";
    for (var i=0; i<10; ++i) paper[i].style.display="none";
        
    socket.send(obj_string);
}
