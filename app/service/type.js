'use strict';
const Service = require('egg').Service;

class TypeService extends Service {
    // Get the list of the type by user_id
    async getTypeList(user_id) {
        const {ctx, app} = this;
        try {
            const types = await app.model.Type.find({$or:[{user_id: "0"},{user_id: user_id}]});
            return types;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

     // add type
     async addType(params) {
        const {ctx, app} = this;
        try {
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