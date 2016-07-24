module.exports = function createSwitchShowing( options ) {
    return new Jazzy(
        options.el,
        [
            {
                name: "show",
                rightNow: function(el) {
                    Jazzy.addClass(el, options.animationName.show);
                    Jazzy.addClass(el, "hide");
                },
                afterDelay: function(el) {
                    Jazzy.removeClass(el, "hide");
                },
                afterAnimation: function(el) {
                    Jazzy.removeClass(el, options.animationName.show);
                    console.timeEnd("animationShow");
                },
                cancelActions: [
                    {
                        name: "hide",
                        removeClass: [options.animationName.hide]
                    }
                ],
                delay: 0,
                events: ( options.flux ? {
                    rightNow: ["show:start"],
                    afterDelay: ["show:afterDelay"],
                    afterAnimation: ["show:end"]
                } : undefined)
            },
            {
                name: "hide",
                rightNow: function(el) {

                },
                afterDelay: function(el) {
                    Jazzy.addClass(el, options.animationName.hide);
                },
                afterAnimation: function(el) {
                    Jazzy.addClass(el, "hide");
                    Jazzy.removeClass(el, options.animationName.hide);
                    console.timeEnd("animationHide");
                },
                cancelActions: [
                    {
                        name: "show",
                        removeClass: [options.animationName.show]
                    }
                ],
                delay: 0,
                events: ( options.flux ? {
                    rightNow: ["hide:start"],
                    afterDelay: ["hide:afterDelay"],
                    afterAnimation: ["hide:end"]
                } : undefined)
            }
        ],
        options.state,
        options.flux
    );
}