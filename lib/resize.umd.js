(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.resize = factory());
}(this, (function () { 'use strict';

    var attribute = {
        'style': "display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;",
        'type': 'text/html',
        'tabindex': '-1',
        'aria-hidden': 'true',
        'data': 'about:blank'
    };
    var resize = function (element, eventCallback) {
        var position = window.getComputedStyle(element).position;
        if (position === 'static' || position === '') {
            element.style.position = 'relative';
        }
        var objectElement = document.createElement('object');
        Object.keys(attribute).forEach(function (key) { return objectElement.setAttribute(key, attribute[key]); });
        objectElement.addEventListener('load', function () {
            var _a;
            var win = (_a = this.contentDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
            win === null || win === void 0 ? void 0 : win.addEventListener('resize', function () {
                var obj = Object.create(null);
                obj.width = this.innerWidth;
                obj.height = this.innerHeight;
                eventCallback(obj);
            });
            var obj = Object.create(null);
            obj.width = win === null || win === void 0 ? void 0 : win.innerWidth;
            obj.height = win === null || win === void 0 ? void 0 : win.innerHeight;
            eventCallback(obj);
        });
        element.appendChild(objectElement);
    };

    return resize;

})));
