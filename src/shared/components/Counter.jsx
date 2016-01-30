import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {increment, getName} from '../actions/counter';
import { bindActionCreators } from 'redux';

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
    }

    componentWillMount() {
        if(this.props.name == null) {
            this.props.getName();
        }
    }

    handleIncrementClick() {
        this.props.increment();
    }

    render() {
        if (__SERVER__) {
            /**
             * This is only run on the server, and will be removed from the client build.
             */
            console.log("Hello server");
        }

        if (__CLIENT__) {
            /**
             * This is only run on the client.
             */
            console.log("Hello client");
        }

        let counter = <div>Loading...</div>;

        if(this.props.name != null) {
            counter =
                <div>
                    <h3>Hi {this.props.username}!</h3>
                    Here, play with {this.props.name}: <br/>
                    <input type="text" value={this.props.counter}/>
                    <input type="button" value="increment" onClick={this.handleIncrementClick}/>
                </div>
        }

        return(
            <div>
                {counter}
            </div>
        );
    }
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        counter: state.counter.get('count'),
        username: state.auth.get('username'),
        name: state.counter.get('name')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        increment: bindActionCreators(increment, dispatch),
        getName: bindActionCreators(getName, dispatch)
    }
}

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;