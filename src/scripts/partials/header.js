var template = require('../../../src/templates/header.html');
var Model = require('../models/header-model');

var Header = function Header(app) {
    this.model = new Model();
    this.view = function() {
        var view = app.handlebars.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {
    };
};

module.exports = Header;