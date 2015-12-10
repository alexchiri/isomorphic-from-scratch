import fs from 'fs';
import path from 'path';
import koa from "koa";
import proxy from "koa-proxy";
import serve from "koa-static";
import React from "react";
import ReactDOM from 'react-dom/server';
import {Router, RoutingContext, match, Route} from "react-router";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation'
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { createStore,
    combineReducers,
    applyMiddleware }  from 'redux';

import createRoutes from '../shared/routes';
import rootReducer from '../shared/reducers/root';

const app      = koa();
const hostname = process.env.HOSTNAME || "localhost";
const port     = process.env.PORT || 8000;

app.use(serve("static", {defer: true}));

app.use(function *(next) {
    const location = createLocation(this.path);
    let history = createMemoryHistory();
    let routes = createRoutes(history);

    yield ((callback) => {
        match({routes, location}, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
                return;
            }

            if (error || !renderProps) {
                callback(error);
                return;
            }

            const index = fs.readFileSync(path.resolve(__dirname, '../index.html'), {encoding: 'utf-8'} );
            const store = applyMiddleware(thunk)(createStore)(rootReducer);
            const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";

            var markup = ReactDOM.renderToString(
                <Provider store={store}>
                    <RoutingContext {...renderProps}/>
                </Provider>
            );
            let state = JSON.stringify( store.getState() );

            this.body = index
                .replace( '${markup}', markup )
                .replace( '${state}', state )
                .replace( '${webserver}', webserver);

            callback(null);
        });
    });
});


app.listen(port, () => {
    console.info("==> ✅  Server is listening");
    console.info("==> 🌎  Go to http://%s:%s", hostname, port);
});
