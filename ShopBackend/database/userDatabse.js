const mongoose = require("mongoose")

const connect = mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
} )
.then( () => console.log("Mongodd conncected Successfully "))
.catch((error) => console.log( "Error while connecting to mongo",error))