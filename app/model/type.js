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
    initTypeData(Type)
    return Type
}

function initTypeData(Type) {
  Type.find({}, (err, doc) => {
      if (err) {
          console.log(err)
          console.log('init TYPE failed')
      } else if (!doc.length) {
          new Type({
              name: 'Grocery',
              type: 1,
              user_id: '0',
          }).save()
      } else {
          console.log('-------------init TYPE successfully--------------')
      }
  })
}