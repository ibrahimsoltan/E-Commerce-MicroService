const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema(
    {
        id: {
            type: Number,
            required : true,
        },
        name: {
            type: String,
            required : true,
            unique: [true, "product already taken"]
        },
        price:{
            type: Number,
            required :true
        },
       
    })
const Product = mongoose.model('Product', productSchema)
module.exports = Product
