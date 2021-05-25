const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Students DB
mongoose.connect(
    "mongodb://localhost:127.0.0.1:27017/carParking", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log("Successfully Established Connection with MongoDB"))
    .catch(err => {
        console.log(`Failed to Establish Connection with MongoDB with Error: ${err}`);
    });
module.exports = mongoose;