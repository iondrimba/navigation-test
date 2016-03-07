var template = require('../../../src/templates/footer.html');
var Model = require('../models/footer-model');
var Footer = function Header(app) {
    this.model = new Model();
    this.view = function() {
        var view = app.handlebars.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {
    };
};

module.exports = Footer;