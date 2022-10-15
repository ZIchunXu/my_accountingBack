'use strict';
const Service = require('egg').Service;
const { ObjectId } = require('mongodb');
class BillService extends Service {
    //  Get the list of the bill by user_id
    async getBillList(user_id) {
        const { ctx, app } = this;
        try {
            const bills = await app.model.Bill.find({ user_id: user_id });
            return bills;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // Get bill detail
    async getDetail(id, user_id) {
        const { ctx, app } = this;
        try {
            const bill =  await app.model.Bill.find({ _id: ObjectId(id), user_id: user_id});
            return bill
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // add bill
    async addBill(params) {
        const { ctx, app } = this;
        try {
            return await new app.model.Bill({
                user_id:params.user_id,
                pay_type:params.pay_type, 
                amount:params.amount, 
                date:params.date, 
                type_id:params.type_id, 
                type_name:params.type_name, 
                remark:params.remark
            }).save();
        } catch (err) {
            console.log(err);
        }
    }

    // Change Information
    async editBill(params) {
        const { ctx, app } = this;
        try {
            let result = await app.mysql.updateOne({
                _id: ObjectId(params.id),
                user_id: params.user_id
            }, {
                $set: {
                    pay_type: params.pay_type,
                    amount: params.amount,
                    date: params.date, type_id,
                    type_name: params.type_name,
                    remark: params.remark
                }
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async deleteBill(id, user_id) {
        const { ctx, app } = this;
        try {
            let result = await app.model.deleteOne({ id: id }, { user_id: user_id });
            return result;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

}
module.exports = BillService;