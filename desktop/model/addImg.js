const mongoose = require('mongoose');


const addImgs = mongoose.Schema(
    {
        des : {
            type: String,
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
)

const addImg = mongoose.model('addImg',addImgs);

module.exports = addImg;