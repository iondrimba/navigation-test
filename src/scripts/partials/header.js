var template = require('../../../src/templates/header.html');
import HeaderModel from '../models/header-model.js';

var Header = function Header(app) {
    this.model = new HeaderModel();
    this.view = function() {
        var view = app.compile(template);
        view = view(this.model);
        return view;
    };
    this.render = function() {
    };
};

module.exports = Header;