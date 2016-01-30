import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to the HOME page!</h2>
                <div>Click <Link to={"/counter"}>here</Link> to go to the counter.</div>
            </div>
        );
    }
}