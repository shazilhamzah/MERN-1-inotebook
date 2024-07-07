const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inotebook?directConnection=true";


const connectToMongo = () => {
    mongoose.connect(mongooseURI,()=>{
        console.log("Connected to Mongoose Successfully!");
    })
}

module.exports = connectToMongo;