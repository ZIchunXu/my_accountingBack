'use strict';
module.exports = secret => {
    return async function jwtErr(ctx, next) {
        const token = ctx.request.header.authorization;
        if (token && token !== 'null') {
            try {
                ctx.app.jwt.verify(token, secret);
                await next();
            } catch (error) {
                console.log('error token', token);
                ctx.status = 200;
                ctx.body = {
                    msg: 'token expired, please login again',
                    code: 401,
                };
                return;
            }
        } else {
            ctx.body = 200;
            ctx.body = {
                code: 401,
                msg: 'token does not exist',
            };
            return;
        }
    }
    
}