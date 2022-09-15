'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // Register account
    async register() {
        const {ctx} = this;
        const {username, password} = ctx.request.body;
        if (!username || !password) {
            ctx.body = {
                code: 500,
                msg: 'need to fill username and password',
                data: null,
              };
              return;
        }
        //If database has the username, den cant create new user
        const hasUser = await ctx.service.user.getUser(username);

        if (hasUser) {
            ctx.body = {
                code: 500,
                msg: 'this username already exists',
                data: null,
              };
              return;
        }
        try {
            const result = await ctx.service.user.register({username, password});
            ctx.body = {
                code: 200,
                msg: 'registration is succesful',
                data: null,
            };
        } catch (error) {
            ctx.body = {
              code: 500,
              msg: 'registration failed',
              data: null,
            };
        }
    }

    //Login
    async login() {
        const {ctx, app} = this;
        const {username, password} = ctx.request.body;
        const hasUser = await ctx.service.user.getUser(username);
        if (!hasUser) {
            ctx.body = {
                code: 500,
                msg: 'Plz create an account first',
                data: null,
              };
              return;
        }

        if (hasUser && password !== hasUser.password) {
            ctx.body = {
                code: 500,
                msg: 'Password incorrect',
                data: null,
            }
            return;
        }
        const token = app.jwt.sign({
            id: hasUser.id,
            username: hasUser.username,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 24hrs.
        }, app.config.jwt.secret);

        ctx.body = {
            code: 200,
            msg: 'Login successful',
            data: {
                token,
            },
        }
    }

    // Change Password
    async editPassword() {

    }
}

module.exports = UserController;