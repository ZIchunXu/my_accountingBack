module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;
    const BillSchema = new Schema({
        user_id: {
            type: String
        },
        pay_type: {
            type: Number
        },
        amount: {
            type: String
        },
        date: {
            type: String
        },
        type_id: {
            type: String
        },
        type_name: {
            type: String
        },
        remark: {
            type: String
        }
    })

    const Bill = mongoose.model('bill', BillSchema)
    initBillData(Bill)
    return Bill
}
function initBillData(Bill) {
    Bill.find({}, (err, doc) => {
        if (err) {
            console.log(err)
            console.log('init Bill failed')
        } else if (!doc.length) {
            let date = new Date("2022-10-13 14:01:00");
            console.log(date);
            let time = (date.getTime()).toString();
            console.log(time);
            new Bill({
                user_id:"63477ffbb9c1736bc06c9314",
                pay_type:1,
                amount:334,
                type_id:"6347af46e7eb3c55745536ce",
                type_name: 'Grocery',
                date: time,
                remark: '0',
            }).save()
        } else {
            console.log('-------------init Bill successfully--------------')
        }
    })
  }