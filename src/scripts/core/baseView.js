class BaseView {
   
    constructor(app) {
        this.app = app;
        this.model;
        this.animationDuration = 500;
    }
    view() {
        let view = app.handlebars.compile(template);
        view = view(this.model);
        console.log('base view');
        return view;
    }
    title() {
        console.log('base title');
        return this.model.title;
    }
    render() {
        console.log('base render');
    }
    destroy() {
        console.log('base destroy');
    }
    animateIn(complete) {
        console.log('base animateIn');
        var timeout = setTimeout(() => {
            clearTimeout(timeout);
            complete();
        }, this.animationDuration);

    }
}

export default BaseView;