exports.addClass = function addClass (el, className) {
    if ( ~el.className.search( new RegExp("\\b" + className + "\\b") ) ) return;
    el.className += ' ' + className;
}

exports.removeClass = function removeClass (el, className) {
    el.className = el.className.replace(className, "").replace(/ +$/, "");
}