const mongoose = require('mongoose');

const addInfo = mongoose.Schema(
    {
        fname : {
            type: String,
            required: true,
        },
        lname : {
            type: String,
            required: true,
        },
        phone : {
            type: Number,
            required: true,
        },
        email : {
            type: String,
            required: true,
        },
        password : {
            type : String,
            required: true,
        },
        cpassword : {
            type : String,
            required: true,
        },
        img : {
            type: Buffer,
            required: true,
        }
    },
    {
        timestamps : true
    }
);

const SignInInfo = mongoose.model('SignInInfo', addInfo);

module.exports = SignInInfo;