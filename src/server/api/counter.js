import koaRouter from 'koa-router';
import parse from 'co-body';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {secret_key} from './auth';

const router = koaRouter({prefix: '/api/counter'});

function authenticate(token, context) {
    if(!token) {
        context.throw(401, 'Unauthorised');
    }

    try {
        return jwt.verify(token, secret_key);
    } catch(err) {
        context.throw(401, 'Unauthorised');
    }
}

router.get('/', function*(next) {
    let token = this.cookies.get('token');

    authenticate(token, this);

    this.body = {name: "Super secret counter"}
});

export default router.middleware();