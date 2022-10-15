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
    return Bill
}