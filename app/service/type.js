'use strict';
const Service = require('egg').Service;

class TypeService extends Service {
    //  Get the list of the type by user_id
    // async getTypeList(user_id) {
    //     const {ctx, app} = this;
    //     const QUERY_STR = 'id, user_id, name, type';
    //     let sql = `select ${QUERY_STR} from type where user_id = ${user_id} or user_id = 0`;
    //     try {
    //         const result = await app.mysql.query(sql);
    //         return result;
    //     } catch (err) {
    //         console.log(err);
    //         return null;
    //     }
    // }

     // add type
     async addType(params) {
        const {ctx, app} = this;
        try {
            console.log("SBUOCQEV",params.name);
            return await new app.model.Type({
                name:params.name,
                type:params.type,
                user_id: params.user_id,
              }).save();
        } catch (err) {
            console.log(err);
        }
    }
    
}
module.exports = TypeService;