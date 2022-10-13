'use strict';

const { jwt } = require('../../config/plugin');

const Controller = require('egg').Controller;

class TypeController extends Controller {
    // Get type list by User
    // async getTypeList() {
    //     const { ctx, app } = this;
    //     const token = ctx.request.header.authorization;
    //     const decode = app.jwt.verify(token, app.config.jwt.secret);
    //     try {
    //         if (!decode) {
    //             return;
    //         }

    //         let user_id = decode.id;
    //         const result = await ctx.service.type.getTypeList(user_id);
    //         ctx.body = {
    //             code: 200,
    //             msg: "successful",
    //             data: {
    //                 list: result
    //             }
    //         }
    //     } catch {
    //         ctx.body = {
    //             code: 500,
    //             msg: "get type list fail",
    //             data: null
    //         }
    //     }
    // }

    async addType() {
        const { ctx, app } = this;
        const { name, type } = ctx.request.body;
        const token = ctx.request.header.authorization;
        try {
            if (!token) {
                let user_id = "0";

                const result = await ctx.service.type.addType({ name, type, user_id });
                ctx.body = {
                    code: 200,
                    msg: "successful",
                    data: null,
                }
            } else {
                const decode = app.jwt.verify(token, app.config.jwt.secret);
                var user_id = decode.id.toString();
                const result = await ctx.service.type.addType({ name, type, user_id });
                ctx.body = {
                    code: 200,
                    msg: "successful",
                    data: null,
                }
            }
        } catch {
            ctx.body = {
                code: 500,
                msg: "add type fail",
                data: null
            }
        }
    }
}

module.exports = TypeController;