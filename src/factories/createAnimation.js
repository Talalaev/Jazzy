module.exports = function createAnimation( options ) {
    options.animationName = options.animationName || options.name;
    options.state = (options.state !== false ? options.name : false);
    return new Jazzy(
        options.el,
        [
            {
                name: options.name,
                rightNow: function(el) {
                    Jazzy.addClass(el, options.animationName);
                },
                afterDelay: function(el) {
                    
                },
                afterAnimation: function(el) {
                    Jazzy.removeClass(el, options.animationName);
                    console.timeEnd("animationShow");
                },
                allowRestart: options.restart,
                delay: 0,
                events: ( options.flux ? {
                    rightNow: ["start"],
                    afterDelay: ["afterDelay"],
                    afterAnimation: ["end"]
                } : undefined)
            }
        ],
        options.state,
        options.flux
    );
}