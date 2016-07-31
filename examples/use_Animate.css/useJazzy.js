// test Event emit
var animated = false;
var flux = {
    emit: function(name) {
        if ( name === "end" ) animated = false;
        console.log("Emit event: " + name);
    }
};


/*
// Simple usage Example
var simpleCreate = Jazzy.createAnimation({
    el: document.getElementById("my_simple_animated_element"),
    name: "bounce", // имя свойства для вызова анимации
    state: "bounce", // свойство и анимация которая будет запущена сразу по созданию ! не обязательный
    animationName: "bounce", // class css устанавливаемый на анимируемый элемент ! не обязательный
    restart: true, // ! не обязательный
    flux: flux // ! не обязательный
});


Если свойство animationName или state совпадает с name его можно не указывать.
Если на элементе привязанно больше одной анимации то свойство state может иметь более одного варианта и в этом случае есть смысл его указывать.
Если вам нужно добавлять и удалять больше одного класса то указывайте их явно через пробел в свойстве animationName

var simpleCreate = Jazzy.createAnimation({
    el: document.getElementById("my_simple_animated_element"),
    name: "bounce",
    restart: true, 
    flux: flux
});


var buttonBounce = document.getElementById("bounce");

buttonBounce.addEventListener("click", function(e) {
    console.time("animationShow");
    console.time("delayShow");
    simpleCreate.bounce();
});
*/

var animatedElement = document.getElementById("my_simple_animated_element");

var animations = {},
    animationGroups = [],
    animationsNames = {},
    optgroup = document.querySelectorAll(".js--animations optgroup");


for ( let i = 0, length = optgroup.length; i < length; i++ ) {
    let group = optgroup[i],
        groupName = group.getAttribute("label"),
        animationsInGroup = group.getElementsByTagName("option");
    
    animationGroups.push(groupName);
    animationsNames[groupName] = ( () => {
        var animationNamesInGroup = [];
        for ( let j = 0, length = animationsInGroup.length; j < length; j++ )
            animationNamesInGroup.push(animationsInGroup[j].value);
        return animationNamesInGroup;
    })();
}


var buttons = document.getElementById("buttons");

animationGroups.forEach( (groupName) => {
    var fragment = document.createDocumentFragment();
    var ul = document.createElement("UL");
    var li = document.createElement("LI");
    li.className = "header";
    li.innerHTML = groupName;
    ul.appendChild(li);
    animationsNames[groupName].forEach( (animationName) => {
        var li = document.createElement("LI");
        var button = document.createElement("BUTTON");
        button.id = animationName;
        button.innerHTML = animationName;
        li.appendChild(button);
        ul.appendChild(li);
        
        animations[animationName] = Jazzy.createAnimation({
            el: animatedElement,
            name: animationName,
            state: false,
            restart: true,
            flux: flux
        });
        var buttonBounce = document.getElementById(animationName);

        setTimeout(function() {
            document.getElementById(animationName).addEventListener("click", function(e) {
                if ( animated ) return;
                animated = true;
                console.time("animationShow");
                console.time("delayShow");
                animations[animationName][animationName]();
            });
        }, 0);
        
    });
    fragment.appendChild(ul);
    buttons.appendChild(fragment);
});





