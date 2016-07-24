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
    el: $("#my_simple_animated_element").get(0),
    state: "show",
    animationName: {
        show: "showLeft",
        hide: "hideLeft"
    },
    flux: flux // не обязательный
});

var buttonSimpleShow = $("#simple_show");
var buttonSimpleHide = $("#simple_hide");

buttonSimpleShow.on("click", function(e) {
    console.time("animationShow");
    console.time("delayShow");
    simpleCreate.show();
});

buttonSimpleHide.on("click", function(e) {
    simpleCreate.hide();
    console.time("animationHide");
    console.time("delayHide");
});





// Custom usage Example
var jazzy = new Jazzy(
    $("#my_animated_element").get(0),
    [
        {
            name: "show",
            rightNow: function(el) {
                $(el).addClass("showLeft");
                $(el).addClass("hide");
            },
            afterDelay: function(el) {
                $(el).removeClass("hide");
            },
            afterAnimation: function(el) {
                $(el).removeClass("showLeft");
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
                $(el).addClass("hideLeft");
            },
            afterAnimation: function(el) {
                $(el).addClass("hide");
                $(el).removeClass("hideLeft");
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


var buttonShow = $("#show");
var buttonHide = $("#hide");

buttonShow.on("click", function(e) {
    console.time("animationShow");
    console.time("delayShow");
    jazzy.show();
});

buttonHide.on("click", function(e) {
    jazzy.hide();
    console.time("animationHide");
    console.time("delayHide");
});