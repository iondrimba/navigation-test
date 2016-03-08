var page = require('../../node_modules/page/page');
var $ = require('../../node_modules/jquery/dist/jquery');
var handlebars = require('handlebars');
import Controller from "./core/controller.js";

class App {
    constructor() {
        this.$ = $;
        this.router = page;
        this.handlebars = handlebars;
        this.controller = new Controller(this);
        this.controller.start();
    }
    compile(template) {
        return this.handlebars.compile(template);
    }
}

window.app = new App();