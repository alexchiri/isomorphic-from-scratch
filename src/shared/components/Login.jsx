import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../actions/auth';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick() {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let location = this.props.location.state.redirectAfterLogin;

        this.props.login(username, password, location);
    }

    componentDidUpdate() {
        if(this.props.loggedIn) {
            this.context.router.push({pathname: this.props.redirectAfterLogin})
        }
    }

    render() {
        return (
            <div>
                <div style={{color: "red"}}>{this.props.errorMessage}</div>
                <h3>You need to login first before accessing the Counter (dummyUser:dummyPass):</h3>
                <input type="text" ref="username" placeholder="dummyUser"/><br/>
                <input type="password" ref="password" placeholder="dummyPass"/><br/>
                <button onClick={this.handleLoginClick}>Login</button>
            </div>
        );
    }
}

Login.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    redirectAfterLogin: PropTypes.string.isRequired
};

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.get('errorMessage'),
        loggedIn: state.auth.get('loggedIn'),
        redirectAfterLogin: state.auth.get('redirectAfterLogin')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);