
const express = require('express');
const db = require("./config/db")
const body = require("body-parser");
const app = express();
const router = express.Router();
app.use(body.json())

app.use('/', router);


// base URLs
app.use("/carParking", require("./routes/carParkingRouts"));



const PORT =  8000;
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})

// URL List

console.log("                                                                     ");

console.log("POST user inserting car details for parking ..........." + "/carParking");

console.log("                                                                     ");

console.log("Get all user carParked data................/carParking/getAll")

console.log("                                                                     ");
console.log("Get user car Parked data by name/carNumber............... /carParking/getByName");

console.log("                                                                     ");

console.log("                                                                     ");
console.log("Get Unparked Status data by name/carNumber............... /carParking/getUnparkedStatus");

console.log("                                                                     ");

console.log("PUT unparking car.........../carParking//unparked")