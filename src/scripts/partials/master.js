var template = require('../../../src/templates/master.html');
var Model = require('../models/home-model');
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
    this.model = new Model();
    this.view = function() {
        this.model.headerView =  this.header.view();
        this.model.menuView = this.menu.view();
        this.model.footerView = this.footer.view();
        var view = app.handlebars.compile(template);
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