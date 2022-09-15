'use strict';
const Service = require('egg').Service;

class HomeService extends Service {
    // Get all users
    async user() {
        const {ctx, app } = this;
        const QUERY_STR = 'id, userusername';
        let sql = `select ${QUERY_STR} from user`;
        try {
            const result = await app.mysql.query(sql);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // Add users
    async addUser(username) {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.insert('user', { username });
            return result;
        } catch (err) {
            console.log(err);
        }
      }
    // Edit user
    async editUser(id, username) {
        const { ctx, app } = this;
        try {
            let result = await app.mysql.update('user', { username },
            {
                where: {
                    id,
                },
            }
            );
            return result;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // Find User
    async findUser(id) {
        const {ctx, app } = this;
        try {
            let result = await app.mysql.get('user', {id},
            {
                where: {
                    id,
                }
            });
            return result;
        } catch (error) {
            console.log(err);
            return null;
        }
    }

    // Delete User
    async deleteUser(id) {
        const {ctx, app } = this;
        try {
            let result = await app.mysql.delete('user', {id}, 
            {
                where: {
                    id,
                }
            });
            return result;
        } catch (error) {
            console.log(err);
            return null;
        }
    }
}
module.exports = HomeService;