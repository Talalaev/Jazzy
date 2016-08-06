var events = document.getElementsByClassName("events")[0],
    log = events.getElementsByClassName("events-log")[0],
    buttonClear = events.getElementsByClassName("clear-log")[0];

function inform( message ) {
    var li = document.createElement("LI");
    li.innerHTML = message;
    log.appendChild(li);
}

inform.clear = function() {
    log.innerHTML = "";
}

buttonClear
    .addEventListener("click", function(e) {
        inform.clear();
    });