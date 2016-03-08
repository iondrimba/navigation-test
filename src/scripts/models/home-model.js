import BaseModel from './base-model.js';

class HomeModel extends BaseModel {
    constructor() {
        super();
        super.title = 'Home';
    }
    set title(string) {
        super.title = string;
    }
    get title() {
        return super.title;
    }
};

export default HomeModel;