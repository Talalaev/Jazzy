class Jazzy {
    constructor(el, actions, state, flux) {
        var
            self = this,
            deferredAction = {
                afterDelay: {},
                afterEnd: {}
            },
            animated = {},
            states = {};
        
        this.findDuration = findDuration;
        this.findDelay = findDelay;

        if ( state ) {
            setTimeout(function() {
                self[state]();
                states[state] = true;
            }, 0);
        }

        actions.forEach(function(action) {

            states[action.name] = (( state === states[action.name] ) ? true : false);

            self[action.name] = function() {
                for ( var key in states ) {
                    if ( key === action.name ) continue;
                    states[key] = false;
                }
                if ( !action.allowRestart ) {
                    if ( states[action.name] ) {
                        return;
                    } else {
                        states[action.name] = !states[action.name];
                    }
                }

                console.time("animationShow");
                //console.time("event animationEnd");

                if ( action.cancelActions && action.cancelActions.length ) {
                    // отмена текущих действий и запланированных
                    action.cancelActions.forEach(function(cancelAction) {
                        clearTimeout( deferredAction.afterEnd[cancelAction.name] );
                        clearTimeout( deferredAction.afterDelay[cancelAction.name] );
                        cancelAction.removeClass.forEach(function(className) {
                            Jazzy.removeClass(el, className);
                        });
                        animated[cancelAction.name] = false;
                    });
                }

                // нельзя планировать следующую анимацию пока не выполнилась текущая
                if ( animated[action.name] ) return console.log("animated");
                animated[action.name] = true;

                // действие до анимации
                action.rightNow(el);

                // генерация событий старта
                if ( action.events ) {
                    if ( action.events.rightNow && action.events.rightNow.forEach ) {
                        action.events.rightNow.forEach(function(event) {
                            flux.emit(event);
                        });
                    }
                }

                deferredAction.afterDelay[action.name] = setTimeout(function() {
                    console.timeEnd("delayShow");
                    console.timeEnd("delayHide");


                    var
                        delay = findDelay(el),
                        duration = findDuration(el);

                    //  действия после задержки
                    action.afterDelay(el, action.delay, duration);

                    // генерация событий после задержки
                    if ( action.events ) {
                        if ( action.events.afterDelay && action.events.afterDelay.forEach ) {
                            action.events.afterDelay.forEach(function(event) {
                                flux.emit(event);
                            });
                        }
                    }
                    /*
                        // если просто раскоментировать то срабатывание события будет нестабильным. рас сработало, рас нет
                        // позже могут все не сработавшие события прилететь на следущем сработавшем.
                        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                        $(el).one(animationEnd, function() {
                            alert("TYT");
                            console.log("animationEnd");
                        });
                    */

                    // действия после анимации
                    deferredAction.afterEnd[action.name] = setTimeout(function() {
                        animated[action.name] = false;
                        delete deferredAction.afterEnd[action.name];
                        action.afterAnimation(el, action.delay, duration);

                        // генерация событий окончания
                        if ( action.events ) {
                            if ( action.events.afterAnimation && action.events.afterAnimation.forEach ) {
                                action.events.afterAnimation.forEach(function(event) {
                                    flux.emit(event);
                                });
                            }
                        }

                    }, findDuration(el));

                }, action.delay);


            }
        });

        function findDuration(el) {
            var duration = getComputedStyle(el).animationDuration;
            duration = (duration.slice(-2, -1) === "m")
                ? duration.slice(0, -2)
                : duration.slice(0, -1) * 1000;
            return duration;
        }
        function findDelay(el) {
            var delay = getComputedStyle(el).animationDelay;
            delay = (delay.slice(-2, -1) === "m")
                ? delay.slice(0, -2)
                : delay.slice(0, -1) * 1000;
            return delay;
        }
    }
}

var helpers = require('./helpers');

Jazzy.addClass = helpers.addClass;
Jazzy.removeClass = helpers.removeClass;
Jazzy.createAnimation = require('./factories/createAnimation');
Jazzy.createSwitchShowing = require('./factories/createSwitchShowing');

module.exports = Jazzy;