const Generator = require('./src/Generator');

(function (root, name, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root[name] = factory;
    }

}(this, 'Generator', Generator));
