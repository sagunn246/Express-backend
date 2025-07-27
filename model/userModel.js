const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    userName:{
        type: String,
    },
       contactNumber:{
        type: String,
    },
    email: {
        type: String,
    },
    password:{
        type: String,
    },
    city:{
        type: String,
    },
    street:{
        type: String,
    },
    deliveryDescription:{
        type: String,
    },

    role: {
        type: String,
    },
})
userSchema.pre("save", async(next)=>{
    const user=  this;
    if(!user.isModified("password")) return next();
})
const User = mongoose.model('User',userSchema)
module.exports = User;