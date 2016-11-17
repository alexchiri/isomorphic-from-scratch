import fs from 'fs';
import path from 'path';
import koa from "koa";
import koaRouter from 'koa-router';
import proxy from "koa-proxy";
import serve from "koa-static";
import React from "react";
import ReactDOM from 'react-dom/server';
import {Router, RouterContext, match, Route} from "react-router";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {createMemoryHistory, createLocation} from 'history'
import { createStore,
    combineReducers,
    applyMiddleware }  from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

import createRoutes from '../shared/routes';
import rootReducer from '../shared/reducers/root';
import auth from '../server/api/auth';
import counter from '../server/api/counter';

const app      = koa();
const appRouter = koaRouter();
const hostname = process.env.HOSTNAME || "localhost";
const port     = process.env.PORT || 8000;

const index = fs.readFileSync(path.resolve(__dirname, '../index.html'), {encoding: 'utf-8'} );
const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";

app.use(serve("static", {defer: true}));

app.use(appRouter.routes());
app.use(auth);
app.use(counter);

app.use(function *(next) {
    let history = createMemoryHistory();
    const location = createLocation(this.path);
    const store = applyMiddleware(thunk, apiMiddleware)(createStore)(rootReducer);
    let routes = createRoutes(store, history);

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

            var markup = ReactDOM.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps}/>
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
