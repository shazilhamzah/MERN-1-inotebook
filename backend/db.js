const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017";


const connectToMongo = () => {
    mongoose.connect(mongooseURI,()=>{
        console.log("Connected to Mongoose Successfully!");
    })
}

module.exports = connectToMongo;



// //! THIS IS FOR CLOUD

// const { MongoClient, ServerApiVersion, MongoDriverError } = require('mongodb');
// const uri = "mongodb+srv://shazilhamzah:shazil1286@cluster0.xdtpgdv.mongodb.net/?appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function connectToMongo() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = connectToMongo;