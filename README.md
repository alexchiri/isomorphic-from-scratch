# Isomorphic from scratch

There are so many takes out there on how isomorphic apps should be done, that it is a bit overwhelming for a beginner.
Therefore, I am starting a ReactJS app from scratch with the goal of having a bare isomorphic app to use as a skeleton.
Besides having yet-another-starter-kit, I would like to take it step by step and understand the decisions I am making on the way, rather than getting everything as a given black box.

## Main node modules

* [redux](https://github.com/rackt/redux) - managing the apps state
* [react-router](https://github.com/rackt/react-router) and [history](https://github.com/rackt/history) - handling routing and navigation for client and server
* [koa](https://github.com/koajs/koa) - handling server-side requests
* [koa-router](https://github.com/alexmingoia/koa-router) - handling server-side API requests
* [babel](https://github.com/babel/babel) - transpiler of choice
* [piping](https://github.com/mdlawson/piping) - reloads code when it changes
* [redux-logger](https://github.com/fcomb/redux-logger) - logging middleware
* [webpack](https://github.com/webpack/webpack) - code bundler and more
* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) - create and verify password hashes
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - create and verify JWT tokens
* [co-body](https://github.com/cojs/co-body) - parse requests body in generator style

## How to run

* Clone this repository
* Run `npm install` to install all the modules
* Run `npm run watch` to start it in development mode, or
* Run `npm run build:production` and then `npm run start:production` to start it in production mode.

## Authentication

I want to give some details about the way I did the authentication, because most of the examples out there store the JWT token in localStorage which is not really [secure](http://michael-coates.blogspot.se/2010/07/html5-local-storage-and-xss.html). [A better way](https://stormpath.com/blog/token-auth-spa/) would be to store the token in httpOnly, secure cookies, which the JS app cannot read and are only transferred over HTTPS.

One cool thing about this approach (besides being more secure) is that the JS app is not even aware of the token. It only needs to know if it is authenticated or not, the browser takes care of the rest.

### An approach to protect your routes

One of the approaches I found online (and I liked the most) for protecting the routes that require authentication is by wrapping the "parent" component with a function that verifies authentication. Take a look at the routes of this project:

```jsx harmony
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
```
In order to access the `/counter` route, authentication is required. This is accomplished through the [requireAuthentication](src/shared/components/AuthenticatedComponent.jsx) function and the [AuthenticatedComponent](src/shared/components/AuthenticatedComponent.jsx), which verifies if a user is logged in by checking the app's state. If not logged in, the user is redirected to `/login` while the original path he/she wanted to go to is kept in state. After successful login, the user is redirected to the `/counter` page. All the routes added as children of the `/counter` route will also be protected, which makes it pretty convenient.

### Authentication with JWT and cookies
                                                                                                                                 
When the user submits the login form, its username and password are sent to an API endpoint running on the same node server that serves the client app. What this endpoint does, is pretty simple:
                                                                                                                                 
```javascript 1.6
// normally you would get the user credentials from storage, but for this example they are hardcoded here:
// you should not store the user's password, but a hash and then compare at login
export const username = "dummyUser";
export const passwordHash = bcrypt.hashSync("dummyPass", 8);
// also you would need a secret key to create the jwt token (and also to verify it in other requests):
// you could take 2 from here and concatenate them: https://www.grc.com/passwords.htm
export const secret_key = "super_long_secret_key";

router.post('/', function*(next) {
    var body = yield parse.json(this);

    if (!body.username && !body.password) this.throw(400, 'username and password are required!');

    if(!bcrypt.compareSync(body.password, passwordHash)) {
        this.throw(401, 'Unauthorised');
    }

    let token = jwt.sign({username: username}, secret_key, { algorithm: 'HS256'});

    if(process.env.NODE_ENV === "production") {
        this.cookies.set("token", token, {httpOnly: true /*, secure: true*/}); //should enable secure if https is available
    } else {
        this.cookies.set("token", token);
    }

    this.status = 200;
});
``` 
                                                                                                                               
First of all, parses the body of the request to get the username and password.
Once found, compares the hash of the received password with the one from storage (hardcoded in this case)
Afterwards generates a JTW token (which will have the username as payload) using a secret_key and sets this token as a httpOnly cookie in the response.
                                                                                                                               
When the browser receives the response with the cookie, it will install the cookie in its cookie store. Because the cookie is httpOnly, the client JS app will not be able to read it, therefore secure for XSS attacks. Also, whenever a new call is done from the JS app to the server side, the browser will automatically attach the cookie to the request, and this way, authenticating the user.

Go ahead and check, while giving this project a run, that the cookie is installed and then also sent with all the other requests.
![](http://0f8f28fe275e3a043777-67ab80ec00c7299bd1255995bf933a71.r1.cf2.rackcdn.com/Screen%20Shot%202016-01-30%2013%3A38%3A45%20%28Edited%29.jpg)
![](http://0f8f28fe275e3a043777-67ab80ec00c7299bd1255995bf933a71.r1.cf2.rackcdn.com/Screen%20Shot%202016-01-30%2013%3A39%3A19%20%28Edited%29.jpg)
![](http://0f8f28fe275e3a043777-67ab80ec00c7299bd1255995bf933a71.r1.cf2.rackcdn.com/Screen%20Shot%202016-01-30%2013%3A39%3A46.png)
                                                                                                                             
One important detail, is that in order to have the browser to install the cookie in the store and to attach it to all subsequent request, there's a special flag that has to be set to the XHR request (more details here: [https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
I used a module for doing the API calls, called [redux-api-middleware](https://github.com/agraboso/redux-api-middleware). You can notice that all my API action creators have a `credentials: include` property, which basically is translated in `withCredentials` further along.                                                                                                                               

## Still to do

* ~~immutable state with [immutability](https://github.com/facebook/immutable-js/)~~
* ~~authentication with JWT~~ logout, token expiration and not being required to login if page refreshed (unless token is expired)
* tests with [mocha](https://github.com/mochajs/mocha), [chai](https://github.com/chaijs/chai)

## Inspiration

* [https://github.com/RickWong/react-isomorphic-starterkit](https://github.com/RickWong/react-isomorphic-starterkit)
* [https://github.com/RickWong/react-transmit](https://github.com/RickWong/react-transmit)
* [https://github.com/coodoo/react-redux-isomorphic-example](https://github.com/coodoo/react-redux-isomorphic-example)