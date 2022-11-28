module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;
    const TypeSchema = new Schema({
        name: {
            type: String
        },
        type: {
            type: Number
        },
        user_id: {
            type: String
        }
    })

    const Type = mongoose.model('type', TypeSchema)
    return Type
}