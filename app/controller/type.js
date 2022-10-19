'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
    // Get type list by User
    async getTypeList() {
        const { ctx, app } = this;
        console.log("This is app",app);
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        try {
            if (!decode) {
                return;
            }

            let user_id = decode.id.toString();
            const result = await ctx.service.type.getTypeList(user_id);
            const resultMap = [];
            for (let i in result) {
                let resultNew = {
                    id: result[i]._id.toString(),
                    name: result[i].name,
                    type: result[i].type,
                    user_id: result[i].user_id,
                }
                resultMap.push(resultNew);
            }
            ctx.body = {
                code: 200,
                msg: "successful",
                data: {
                    list: resultMap
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

    async addType() {
        const { ctx, app } = this;
        const { name, type } = ctx.request.body;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);
        try {
            if (!decode) {
                return;
            }
            var user_id = decode.id.toString();
            await ctx.service.type.addType({ name, type, user_id });
            ctx.body = {
                code: 200,
                msg: "successful",
                data: null,
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