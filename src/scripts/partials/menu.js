var template = require('../../../src/templates/menu.html');
var Model = require('../models/menu-model');
var Menu = function Menu(app) {
    this.model = new Model();
    this.view = function() {
        var view = app.handlebars.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {

    };
};


module.exports = Menu;