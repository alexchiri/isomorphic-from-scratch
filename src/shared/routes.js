import React from 'react';
import {Router, IndexRoute, Route} from 'react-router';

import App from '../shared/components/App.jsx';
import CounterContainer from '../shared/components/Counter.jsx';

export default (store, history) => {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                { /* Home (main) route */ }
                <IndexRoute component={CounterContainer}/>

                { /* <Route path="*" component={NotFound} status={404} /> */ }
            </Route>
        </Router>
    );
};