'use strict';
const Service = require('egg').Service;

class UserService extends Service {
    async getUser(username) {
        const {ctx, app} = this;
        try {
            return await app.mysql.get('user', {username});
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // Register account
    async register(params) {
        const {ctx, app} = this;
        try {
            const result = await app.mysql.insert('user', params);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    // Change Information
    async editInfor(username, params) {
        const {ctx, app} = this;
        try {
            let result = await app.mysql.update('user', {...params},
            {
                where: {
                    username,
                },
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    
}
module.exports = UserService;