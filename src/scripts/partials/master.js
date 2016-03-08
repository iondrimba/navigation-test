var template = require('../../../src/templates/master.html');
import HomeModel from '../models/home-model.js';
var Header = require('./header');
var Menu = require('./menu');
var Footer = require('./footer');

var Master = function Master(app) {
    var view = template;
    this.setup = function() {
        this.header = new Header(app);
        this.menu = new Menu(app);
        this.footer = new Footer(app);
    };
    this.model = new HomeModel();
    this.view = function() {
        this.model.headerView =  this.header.view();
        this.model.menuView = this.menu.view();
        this.model.footerView = this.footer.view();
        var view = app.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {

        this.header.render();

        this.menu.render();

        this.footer.render();
    };
    this.destroy = function() {};
};


module.exports = Master;