// const mongoose = require('mongoose');
// const mongooseURI = "mongodb://127.0.0.1:27017/";


// const connectToMongo = () => {
//     mongoose.connect(mongooseURI,()=>{
//         console.log("Connected to Mongoose Successfully!");
//     })
// }

// module.exports = connectToMongo;



//! THIS IS FOR CLOUD
require('dotenv').config();

const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri); // Add this line to verify  

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function connectToMongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = connectToMongo;