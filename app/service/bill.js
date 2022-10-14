'use strict';
const Service = require('egg').Service;

class BillService extends Service {
    //  Get the list of the bill by user_id
    async getBillList(user_id) {
        const {ctx, app} = this;
        try {
            const bills = await app.model.Bill.find({user_id:user_id});
            return bills;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // Get bill detail
    async getDetail(id, user_id) {
        const {ctx, app} = this;
        try{
            return await app.mysql.get('bill', {id, user_id});
        } catch(error) {
            console.log(error);
            return null;
        }
    }
    // add bill
    async addBill(params) {
        const {ctx, app} = this;
        try {
            return await app.mysql.insert('bill', params);
        } catch (err) {
            console.log(err);
        }
    }

    // Change Information
    async editBill(params) {
        const {ctx, app} = this;
        try {
            let result = await app.mysql.update('bill', {...params}, {
                where: {
                    id: params.id,
                    user_id: params.user_id,
                },
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async deleteBill(id, user_id) {
        const {ctx, app} = this;
        try {
            let result = await app.mysql.delete('bill', {
                id,
                user_id
            });
            return result;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    
}
module.exports = BillService;