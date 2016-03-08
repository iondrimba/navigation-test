var template = require('../../../src/templates/menu.html');
import MenuModel from '../models/menu-model.js';


var Menu = function Menu(app) {
    this.model = new MenuModel();
    this.view = function() {
        var view = app.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {

    };
};


module.exports = Menu;