'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class BillController extends Controller {
    // get bill list by user_id, filter by month/type
    async getBillList() {
        const { ctx, app } = this;
        const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);


        try {
            if (!decode) {
                return;
            }

            let user_id = decode.id.toString();
            const list = await ctx.service.bill.getBillList(user_id);
            const _list1 = list.filter(item => {
                if (type_id != 'all') {
                    return moment(Number(item.date)).format('YYYY-MM') === date && item.type_id == type_id

                }
                return moment(Number(item.date)).format('YYYY-MM') === date
            })
            const list1 = [];
            for (let i in _list1) {
                let resultNew = {
                    id: _list1[i]._id.toString(),
                    user_id: _list1[i].user_id,
                    pay_type: _list1[i].pay_type,
                    amount: _list1[i].amount,
                    type_id: _list1[i].type_id,
                    type_name: _list1[i].type_name,
                    date: _list1[i].date,
                    remark: _list1[i].remark,
                }
                list1.push(resultNew);
            }
            let listMap = list1.reduce((curr, item) => {
                const date = moment(Number(item.date)).format('YYYY-MM-DD');

                if (curr && curr.length && curr.findIndex(item => item.date === date) > -1) {
                    const index = curr.findIndex(item => item.date === date)
                    curr[index].bills.push(item)
                }

                if (curr && curr.length && curr.findIndex(item => item.date === date) === -1) {
                    curr.push({
                        date,
                        bills: [item]
                    })
                }

                if (!curr.length) {
                    curr.push({
                        date,
                        bills: [item]
                    })
                }
                return curr
            }, []).sort((a, b) => moment(b.date) - moment(a.date));
            console.log(list1);
            const filterListMap = listMap.slice((page - 1) * page_size, page * page_size);
            console.log(filterListMap);
            let list2 = list.filter(item => moment(Number(item.date)).format('YYYY-MM') === date);

            let totalExpense = list2.reduce((curr, item) => {
                if (item.pay_type === 1) {
                    curr += Number(item.amount);
                    return curr;
                }
                return curr;
            }, 0);

            let totalIncome = list2.reduce((curr, item) => {
                if (item.pay_type === 2) {
                    curr += Number(item.amount);
                    return curr;
                }
                return curr;
            }, 0);
            ctx.body = {
                code: 200,
                msg: "successful",
                data: {
                    totalExpense,
                    totalIncome,
                    totalPage: Math.ceil(listMap.length / page_size),
                    list: filterListMap || []
                }
            }
        } catch {
            ctx.body = {
                code: 500,
                msg: " get bill list fail",
                data: null
            }
        }
    }

    // get bill information
    async getDetail() {
        const { ctx, app } = this;
        const { id = '' } = ctx.query;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.secret);
        if (!decode) {
            return;
        }
        let user_id = decode.id.toString();
        if (!id) {
            ctx.body = {
                code: 500,
                msg: "need to have bill id",
                data: null,
            }
            return;
        }
        try {
            const detail = await ctx.service.bill.getDetail(id, user_id);
            ctx.body = {
                code: 200,
                msg: "get bill detail successful",
                data: {
                    id: detail[0]._id.toString(),
                    user_id: detail[0].user_id,
                    pay_type: detail[0].pay_type,
                    amount: detail[0].amount,
                    date: detail[0].date,
                    type_id: detail[0].type_id,
                    type_name: detail[0].type_name,
                    remark: detail[0].remark
                },
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: "ERROR",
                data: null,
            }
        }
    }
    // add bill into list
    async addBill() {
        const { ctx, app } = this;
        const { pay_type, amount, date, type_id, type_name, remark = '' } = ctx.request.body;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.secret);
        if (!decode) {
            return;
        }
        let user_id = decode.id.toString();
        if (!user_id || !amount || !pay_type || !date || !type_id || !type_name) {
            ctx.body = {
                code: 400,
                msg: 'missing parameters',
                data: null,
            };
        }

        try {
            await ctx.service.bill.addBill({
                user_id,
                pay_type,
                amount,
                date,
                type_id,
                type_name,
                remark
            });
            ctx.body = {
                code: 200,
                msg: 'add bill sucessful',
                data: null,
            };
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: 'add bill fail',
                data: null,
            };
        }
    }
    // Edit bill information
    async editBill() {
        const { ctx, app } = this;
        const { id, pay_type, amount, date, type_id, type_name, remark = '' } = ctx.request.body;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.secret);
        if (!decode) {
            return;
        }
        let user_id = decode.id.toString();
        if (!user_id || !amount || !pay_type || !date || !type_id || !type_name) {
            ctx.body = {
                code: 400,
                msg: 'missing parameters',
                data: null,
            };
        }
        if (!id) {
            ctx.body = {
                code: 500,
                msg: "need to have bill id",
                data: null,
            }
            return;
        }
        try {
            await ctx.service.bill.editBill({
                id,
                user_id,
                pay_type,
                amount,
                date,
                type_id,
                type_name,
                remark
            });
            ctx.body = {
                code: 200,
                msg: 'update bill sucessful',
                data: null,
            };
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: 'update bill fail',
                data: null,
            };
        }
    }
    // Delete bill
    async deleteBill() {
        const { ctx, app } = this;
        const { id } = ctx.request.body;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.secret);
        if (!decode) {
            return;
        }
        if (!id) {
            ctx.body = {
                code: 500,
                msg: "need to have bill id",
                data: null,
            }
            return;
        }
        let user_id = decode.id.toString();
        try {
            await ctx.service.bill.deleteBill(id, user_id);
            ctx.body = {
                code: 200,
                msg: "delete bill sucessful",
                data: null,
            };

        } catch (err) {
            ctx.body = {
                code: 200,
                msg: "delete bill fail",
                data: null,
            }
        }
    }
    // 
    async data() {
        const { ctx, app } = this;
        const { date = '' } = ctx.query;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.secret);
        if (!decode) {
            return;
        }
        let user_id = decode.id.toString();
        try {
            const result = await ctx.service.bill.getBillList(user_id);
            const start = moment(date).startOf('month').unix() * 1000;
            const end = moment(date).endOf('month').unix() * 1000;
            const bill_data = result.filter(item => (Number(item.date) > start && Number(item.date) < end));

            const totalExpense = bill_data.reduce((arr, curr) => {
                if (curr.pay_type == 1) {
                    arr += Number(curr.amount);
                }
                return arr;
            }, 0)

            const totalIncome = bill_data.reduce((arr, curr) => {
                if (curr.pay_type == 2) {
                    arr += Number(curr.amount);
                }
                return arr;
            }, 0)

            let total_data = bill_data.reduce((arr, curr) => {
                const index = arr.findIndex(item => item.type_id === curr.type_id);
                if (index === -1) {
                    arr.push({
                        type_id: curr.type_id,
                        type_name: curr.type_name,
                        pay_type: curr.pay_type,
                        number: Number(curr.amount)
                    })
                }
                if (index > -1) {
                    arr[index].number += Number(curr.amount);
                }
                return arr;
            }, []);

            total_data = total_data.map(item => {
                item.number = Number(Number(item.number).toFixed(2))
                return item;
            })
            ctx.body = {
                code: 200,
                msg: "successful",
                data: {
                    totalExpense: Number(totalExpense).toFixed(2),
                    totalIncome: Number(totalIncome).toFixed(2),
                    total_data: total_data || [],
                }
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                msg: "error",
                data: null,
            }
        }
    }

}

module.exports = BillController;