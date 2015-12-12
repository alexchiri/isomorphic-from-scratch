# Isomorphic from scratch

There are so many takes out there on how isomorphic apps should be done, that it is a bit overwhelming for a beginner.
Therefore, I am starting a ReactJS app from scratch with the goal of having a bare isomorphic app to use as a skeleton.
Besides having yet-another-starter-kit, I would like to take it step by step and understand the decisions I am making on the way, rather than getting everything as a given black box.

## Main node modules

* [redux](https://github.com/rackt/redux) - managing the apps state
* [react-router](https://github.com/rackt/react-router) and [history](https://github.com/rackt/history) - handling routing and navigation for client and server
* [koa](https://github.com/koajs/koa) - handling server-side requests
* [babel](https://github.com/babel/babel) - transpiler of choice
* [piping](https://github.com/mdlawson/piping) - reloads code when it changes
* [redux-logger](https://github.com/fcomb/redux-logger) - logging middleware
* [webpack](https://github.com/webpack/webpack) - code bundler and more

## Still to do

* immutable state with [immutability](https://github.com/facebook/immutable-js/)
* tests with [mocha](https://github.com/mochajs/mocha), [chai](https://github.com/chaijs/chai)

## Inspiration

* [https://github.com/RickWong/react-isomorphic-starterkit](https://github.com/RickWong/react-isomorphic-starterkit)
* [https://github.com/RickWong/react-transmit](https://github.com/RickWong/react-transmit)
* [https://github.com/coodoo/react-redux-isomorphic-example](https://github.com/coodoo/react-redux-isomorphic-example)