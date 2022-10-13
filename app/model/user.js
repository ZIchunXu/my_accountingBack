module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        username: {
            type: String
        },
        password: {
            type: String
        },
        about: {
            type: String
        },
        avatar: {
            type: String
        },
        create_time: {
            type:Date
        }
    })

    const User = mongoose.model('user', UserSchema)
    return User
}