'use strict';
const Service = require('egg').Service;

class UserService extends Service {
    async getUserList() {
        const {ctx, app} = this;
        try {
            const users = await app.model.User.find({});
            return Object.assign({}, {
                list: users
            })
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // Get user by username
    async getUser(username) {
        const {ctx, app} = this;
        try {
            const user = await app.model.User.find({username: username});
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // Register account
    async register(params) {
        const {app} = this;
        try {
            return await new app.model.User({
                username:params.username,
                password:params.password,
                about:'',
                avatar:params.avatar,
                create_time: new Date()
              }).save();
        } catch (err) {
            console.log(err);
        }
    }

    //Change Information
    async editInfor(params) {
        const {app} = this;
        try {
            let result = await app.model.User.updateOne({_id:params.info[0].id}, {$set:{about: params.about, avatar: params.avatar}});
            return result;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    //Change Password
    async editPass(params) {
        const {app} = this;
        try {
            let result = await app.model.User.updateOne({_id:params.info[0].id}, {$set:{password: params.password}});
            return result;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
module.exports = UserService;