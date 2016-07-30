// test Event emit
var flux = {
    emit: function(name) {
        console.log("Emit event: " + name);
    }
};



// Simple usage Example
/*
  Привязывает css анимацию по имени анимации к методам показа (show) и скрытия (hide) без необходимости описывать
  все действия на этапах начала анимации, после задержки и после окончания.
  Пример с полным описанием аналогичной информации будет описан ниже.
*/
var simpleCreate = Jazzy.createSwitchShowing({
    el: document.getElementById("my_simple_animated_element"),
    state: "show",
    animationName: {
        show: "bounce animated",
        hide: "jello animated"
    },
    flux: flux // не обязательный
});

var buttonSimpleShow = document.getElementById("simple_show");
var buttonSimpleHide = document.getElementById("simple_hide");

buttonSimpleShow.addEventListener("click", function(e) {
    console.time("animationShow");
    console.time("delayShow");
    simpleCreate.show();
});

buttonSimpleHide.addEventListener("click", function(e) {
    simpleCreate.hide();
    console.time("animationHide");
    console.time("delayHide");
});





// Custom usage Example
var jazzy = new Jazzy(
    document.getElementById("my_animated_element"),
    [
        {
            name: "show",
            rightNow: function(el) {
                Jazzy.addClass(el, "showLeft");
                Jazzy.addClass(el, "hide");
            },
            afterDelay: function(el) {
                Jazzy.removeClass(el, "hide");
            },
            afterAnimation: function(el) {
                Jazzy.removeClass(el, "showLeft");
                console.timeEnd("animationShow");
            },
            cancelActions: [
                {
                    name: "hide",
                    removeClass: ["hideLeft"]
                }
            ],
            allowRestart: true,
            delay: 0,
            events: {
                rightNow: ["show:start"],
                afterDelay: ["show:afterDelay"],
                afterAnimation: ["show:end"]
            }
        },
        {
            name: "hide",
            rightNow: function(el) {
                
            },
            afterDelay: function(el) {
                Jazzy.addClass(el, "hideLeft");
            },
            afterAnimation: function(el) {
                Jazzy.addClass(el, "hide");
                Jazzy.removeClass(el, "hideLeft");
                console.timeEnd("animationHide");
            },
            cancelActions: [
                {
                    name: "show",
                    removeClass: ["showLeft"]
                }
            ],
            delay: 0,
            events: {
                afterAnimation: ["hide:end"]
            }
        }
    ],
    "show",
    flux
);


var buttonShow = document.getElementById("show");
var buttonHide = document.getElementById("hide");

buttonShow.addEventListener("click", function(e) {
    console.time("animationShow");
    console.time("delayShow");
    jazzy.show();
});

buttonHide.addEventListener("click", function(e) {
    jazzy.hide();
    console.time("animationHide");
    console.time("delayHide");
});