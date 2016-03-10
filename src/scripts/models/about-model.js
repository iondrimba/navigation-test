import BaseModel from './base-model';

class AboutModel extends BaseModel {
    constructor() {
        super();
        super.title = 'About';
    }
    set title(string) {
        super.title = string;
    };
    get title() {
        return super.title;
    };
};

export default AboutModel;