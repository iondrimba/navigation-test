let Router = require('../../node_modules/page/page');
let $ = require('../../node_modules/jquery/dist/jquery');
let handlebars = require('handlebars');
import Controller from "./core/controller.js";

class App {
    constructor() {
        this.$ = $;
        this.router = Router;
        this.handlebars = handlebars;
        this.controller = new Controller(this);
        this.controller.start();
    }
}

window.app = new App();