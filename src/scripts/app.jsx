import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="add-comp">
                {' '}
                <Link to="/">Home</Link>
                {' '}
                <Link to="/contact">Contact</Link>
                {' '}
                <Link to="/about">About</Link><br/><br/>
            </div >
        );
    }
}

export default App;