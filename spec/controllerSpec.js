var HomeModel = require('../src/scripts/models/home-model');
var AboutModel = require('../src/scripts/models/about-model');
var ContactModel = require('../src/scripts/models/contact-model');
var NotFoundModel = require('../src/scripts/models/notfound-model');

describe('src/scripts/core - Controller Tests', function() {

    it('App should be defined ', function() {
        expect(app).toBeDefined();
    });

    it('should navigate to home page', function() {
        var model = new HomeModel();
        app.controller.navigate('/');
        expect(app.controller.current.model.title).toEqual(model.title);
    });

    it('should navigate to about page', function() {
        var model = new AboutModel();
        app.controller.navigate('/about');
        expect(app.controller.current.model.title).toEqual(model.title);
    });

    it('should navigate to contact page', function() {
        var model = new ContactModel();
        app.controller.navigate('/contact');
        expect(app.controller.current.model.title).toEqual(model.title);
    });
    it('should navigate to not found page', function() {
        var model = new NotFoundModel();
        app.controller.navigate('/---');
        expect(app.controller.current.model.title).toEqual(model.title);
    });
    it('should throw exeption', function() {
        expect(function() {
            app.controller.navigate();
        }).toThrow();
    });
    it('should have no content - controller.exit', function() {
        app.controller.navigate('/');
        app.controller.empty();
        var contentChildren = app.controller.content.find('div').length;
        expect(contentChildren).toEqual(0);
    });
    it('should have a H6 as content - controller.add(html) ', function() {
        app.controller.navigate('/');
        app.controller.add('<h6>Hello</h6>');
        var contentChildren = app.controller.content.find('h6').length;
        expect(contentChildren).toEqual(1);
    });

    it('should have called click on Home', function() {
        app.controller.navigate('/');
        spyOn(app.controller.current, 'click');
        app.controller.current.click();
        expect(app.controller.current.click).toHaveBeenCalled();
    });

    it('should have called animateInComplete after navigate to Contact ', function(done) {
        spyOn(app.controller, 'animateInComplete');
        app.controller.navigate('/contact');
        var timeout = setTimeout(function() {
            expect(app.controller.animateInComplete).toHaveBeenCalled();
            clearTimeout(timeout);
            done();
        }, 1000);
    });

    it('should have called animateInComplete after navigate to Home', function(done) {
        spyOn(app.controller, 'animateInComplete');
        app.controller.navigate('/');
        var timeout = setTimeout(function() {
            expect(app.controller.animateInComplete).toHaveBeenCalled();
            clearTimeout(timeout);
            done();
        }, 1000);
    });


    it('should have called animateInComplete after navigate to About', function(done) {
        spyOn(app.controller, 'animateInComplete');
        app.controller.navigate('/about');
        var timeout = setTimeout(function() {
            expect(app.controller.animateInComplete).toHaveBeenCalled();
            clearTimeout(timeout);
            done();
        }, 1000);
    });

    it('should have called animateInComplete after navigate to NotFound', function(done) {
        spyOn(app.controller, 'animateInComplete');
        app.controller.navigate('/---');
        var timeout = setTimeout(function() {
            expect(app.controller.animateInComplete).toHaveBeenCalled();
            clearTimeout(timeout);
            done();
        }, 1000);
    });

});