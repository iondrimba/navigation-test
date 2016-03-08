var template = require('../../../src/templates/footer.html');
import FooterModel from '../models/footer-model.js';

var Footer = function Header(app) {
    this.model = new FooterModel();
    this.view = function() {
        var view = app.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {
    };
};

module.exports = Footer;