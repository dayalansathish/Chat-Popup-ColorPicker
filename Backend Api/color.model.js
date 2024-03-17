const mongoose = require('mongoose')

const colorSchema = mongoose.Schema({
    colorValue:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const colorCode = mongoose.model('ColorCode',colorSchema)

module.exports = colorCode