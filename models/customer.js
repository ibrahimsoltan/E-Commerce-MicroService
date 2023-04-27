const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const customerSchema = new Schema(
    {
        email: {
            type: String,
            required : true,
            unique: [true, "username already taken"]
        },
        password:{
            type: String,
            required :true
        },
        
    })

    

    customerSchema.pre('save', function(next){
        const user = this
        bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
        })
        })
        

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer