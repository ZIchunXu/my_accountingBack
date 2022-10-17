'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async getUserList() {
    const { ctx} = this; // 从this获取service
    const users = await ctx.service.user.getUserList();

    ctx.body = {
        code: 0,
        message: 'success',
        data: users
    }
    }
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
                id:info[0]._id,
                username: info[0].username,
                password: info[0].password,
                about: info[0].about,
                avatar: info[0].avatar,
                create_time: info[0].create_time.toLocaleString(),
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
        console.log(hasUser[0]);
        if (hasUser[0]) {
            ctx.body = {
                code: 500,
                msg: 'this username already exists',
                data: null,
            };
            return;
        }
        try {
            const avatar_default = 'https://www.mp3pc.com/uploads/1e23d7974cb987a89501a034ca5f3dfc.jpg';
            await ctx.service.user.register({ username, password, avatar:avatar_default });
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
        if (!hasUser[0]) {
            ctx.body = {
                code: 500,
                msg: 'Plz create an account first',
                data: null,
            };
            return;
        }

        if (hasUser[0] && password !== hasUser[0].password) {
            ctx.body = {
                code: 500,
                msg: 'Password incorrect',
                data: null,
            }
            return;
        }
        
        const token = app.jwt.sign({
            id: hasUser[0]._id,
            username: hasUser[0].username,
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
            await ctx.service.user.editPass({ info, password });
            ctx.body = {
                code: 200,
                msg: 'succesful',
                data: {
                    id: info[0]._id.toString(),
                    username: info[0].username,
                    password,
                    about: info[0].about,
                    avatar: info[0].avatar,
                },
            };
        } catch (err) {
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
            await ctx.service.user.editInfor({ info, about, avatar });
            ctx.body = {
                code: 200,
                msg: 'succesful',
                data: {
                    id: info[0]._id.toString(),
                    username: info[0].username,
                    password: info[0].password,
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