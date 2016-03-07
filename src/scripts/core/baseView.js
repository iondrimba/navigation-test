class BaseView {

    constructor(app) {
        console.log('BaseView constructor', app);
        this.app = app;
        this.animationDuration = 500;
    }
    view(template, model) {
        console.log('base view');
        var view = this.app.handlebars.compile(template);
        view = view(model);
        return view;
    }
    title() {
        console.log('base title');
    }
    render() {
        console.log('base render');
    }
    destroy() {
        console.log('base destroy');
    }
    animateIn(complete) {
        var timeout = setTimeout(function() {
            clearTimeout(timeout);
            complete();
        }, this.animationDuration);
    }
}

export default BaseView;