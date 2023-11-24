const mongoose = require('mongoose');

const dbConnect = ()=>{
    
    mongoose.connect('mongodb+srv://Saif-Ul-llah:saif025362%40@authcluster.ytqfgf2.mongodb.net/')
    .then(()=>{
        console.log("database is connected")
    }).catch((error)=>{
        console.log(error);
    })
}
 module.exports = dbConnect;