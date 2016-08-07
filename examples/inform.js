var events = document.getElementsByClassName("events"),
    consoleSimpleUse = events[0].getElementsByClassName("events-log")[0],
    buttonClearSimpleUse = events[0].getElementsByClassName("clear-log")[0],
    consoleAdvancedUse = events[1].getElementsByClassName("events-log")[0],
    buttonClearAdvanceUse = events[1].getElementsByClassName("clear-log")[0];

var Inform = (function() {
    function Inform( console ) {
    
        this.log = log;
        this.clear = clear;

        function log( message ) {
            var li = document.createElement("LI");
            li.innerHTML = message;
            console.appendChild(li);
        }
        function clear() {
            console.innerHTML = "";
        }
    }
    Inform.create = function( console, button ) {
        var logger = new Inform( console );
        button
            .addEventListener("click", function(e) {
                logger.clear();
            });
        return logger;
    }
    return Inform;
})();



var loggerSimpleUse = Inform.create(consoleSimpleUse, buttonClearSimpleUse),
    loggerAdvanceUse = Inform.create(consoleAdvancedUse, buttonClearAdvanceUse);