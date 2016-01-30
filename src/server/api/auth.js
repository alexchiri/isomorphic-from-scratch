import koaRouter from 'koa-router';
import parse from 'co-body';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = koaRouter({prefix: '/api/login'});

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

export default router.middleware();