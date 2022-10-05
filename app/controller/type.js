'use strict';

const {jwt} = require('../../config/plugin');

const Controller = require('egg').Controller;

class TypeController extends Controller {
    // Get type list by User
    async getTypeList() {
        const {ctx, app} = this;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        try {
            if(!decode) {
                return;
            }

            let user_id = decode.id;
            const result = await ctx.service.type.getTypeList(user_id);
            ctx.body = {
                code: 200,
                msg: "successful",
                data: {
                    list: result
                }
            } 
        } catch {
            ctx.body = {
                code: 500,
                msg: "get type list fail",
                data: null
            }
        }
    }
}

module.exports = TypeController;