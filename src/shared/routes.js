import React from 'react';
import {Router, IndexRoute, Route} from 'react-router';

import App from '../shared/components/App.jsx';
import CounterContainer from '../shared/components/Counter.jsx';
import Home from '../shared/components/Home.jsx';
import Login from '../shared/components/Login.jsx';
import requireAuthentication from './components/AuthenticatedComponent.jsx'

export default (store, history) => {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                { /* Home (main) route */ }
                <IndexRoute component={Home}/>
                <Route path="counter" component={requireAuthentication(CounterContainer)}>
                    { /* all the routes that would be added here would implicitly require authentication as well */}
                </Route>

                { /* <Route path="*" component={NotFound} status={404} /> */ }
            </Route>
            <Route path="/login" component={Login}/>
        </Router>
    );
};