import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {increment} from '../actions/counter';
import { bindActionCreators } from 'redux';

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
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

        return(
            <div>
                Counter: <br/>
                <input type="text" value={this.props.counter}/>
                <input type="button" value="increment" onClick={this.handleIncrementClick}/>
            </div>
        );
    }
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        counter: state.counter.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        increment: bindActionCreators(increment, dispatch)
    }
}

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;