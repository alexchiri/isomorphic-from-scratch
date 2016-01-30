import React from 'react';
import {connect} from 'react-redux';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth();
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth();
        }

        checkAuth () {
            if (!this.props.loggedIn) {
                let redirectAfterLogin = this.props.location.pathname;
                this.context.router.replace({pathname: '/login', state: {redirectAfterLogin: redirectAfterLogin}});
            }
        }

        render () {
            return (
                <div>
                    {this.props.loggedIn === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        loggedIn: state.auth.get('loggedIn')
    });

    AuthenticatedComponent.contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}