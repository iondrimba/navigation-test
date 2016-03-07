var HomeModel = require('../src/scripts/models/home-model');

describe('src/scripts/core - Models Tests', function() {

    it('model should be defined ', function() {
        var model = new HomeModel();
        expect(model).toBeDefined();
    });

    it('title should match "Home" ', function() {
        var model = new HomeModel();
        expect(model.title).toEqual('Home');
    });
});