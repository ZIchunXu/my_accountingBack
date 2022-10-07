'use strict';

const { jwt } = require('../../config/plugin');

const Controller = require('egg').Controller;

class UserController extends Controller {
    // Get user information
    async getUserInfor() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        const info = await ctx.service.user.getUser(decode.username);
        ctx.body = {
            code: 200,
            msg: 'successful',
            data: {
                username: info.username,
                password: info.password,
                about: info.about,
                avatar: info.avatar,
            }
        };
    }
    // Register account
    async register() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
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
            const avatar_default = 'https://www.mp3pc.com/uploads/1e23d7974cb987a89501a034ca5f3dfc.jpg';
            const result = await ctx.service.user.register({ username, password, avatar:avatar_default });
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
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
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
            exp: Math.floor(Date.now() / 1000) + (365 * 60 * 60), // token 24hrs.
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
        const { ctx, app } = this;
        const { password = '' } = ctx.request.body;
        try {
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.secret);
            if (!decode) {
                return;
            }
            const info = await ctx.service.user.getUser(decode.username);
            const result = await ctx.service.user.editInfor({ ...info, password });
            ctx.body = {
                code: 200,
                msg: 'succesful',
                data: {
                    id: info.id,
                    username: info.username,
                    password,
                    about: info.about,
                    avatar: info.avatar,
                },
            };
        } catch (err) {
            console.log('aaa');
            ctx.body = {
                code: 500,
                msg: 'change password fail',
                data: null,
            };
        }
    }
    // Change User Information
    async editUserInfor() {
        const { ctx, app } = this;
        const { about = '', avatar = '' } = ctx.request.body;
        try {
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.secret);
            if (!decode) {
                return;
            }
            const info = await ctx.service.user.getUser(decode.username);
            const result = await ctx.service.user.editInfor({ ...info, about, avatar });
            ctx.body = {
                code: 200,
                msg: 'succesful',
                data: {
                    id: info.id,
                    username: info.username,
                    password: info.password,
                    about,
                    avatar,
                },
            };
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: 'change user about fail',
                data: null,
            };
        }
    }
}

module.exports = UserController;