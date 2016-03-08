import BaseModel from './base-model.js';

class NotFoundModel extends BaseModel {
    constructor() {
        super();
        super.title = 'Ooops!';
        this._returnUrl = '/';
    }
    set title(string) {
        super.title = string;
    };
    get title() {
        return super.title;
    };
    set returnUrl(url) {
        this._returnUrl = url;
    };
    get returnUrl() {
        return this._returnUrl;
    };
};

export default NotFoundModel;