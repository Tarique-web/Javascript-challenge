const { model } = require("mongoose");
const carParkingModel = require("../models/carParkingModels")


//Inserting user Details for parking car...

exports.carParking = async (req, res) => {
    /**
        * Request Validation
        */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "carParkingController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.name || req.body.name == "") {
        return res.status(400).send({
            message: "Name  Can Not Be Empty Please Enter Your Name!",
            status: 400
        });
    }

    if (!req.body.mobile || req.body.mobile == "") {
        return res.status(400).send({
            message: "Mobile Number can not be empty",
            status: 400
        });
    }
    if (!req.body.carNumber || req.body.carNumber == "") {
        return res.status(400).send({
            message: "carNumber can not be empty",
            status: 400
        });
    }


    try {
        let totalParkingSpace = 10;

        while (true) {
            let id = Math.floor(Math.random() * (11 - 1) + 1);

            // check id with checkInDb 
            let checked_Id = await carParkingModel.find({ 'parkingAlotNumber': id });

            if (checked_Id.length == 0
            ) {
                var parkingAlot = id;
                totalParkingSpace++;
                break;

            }

            if (totalParkingSpace == 10) {
                return res.status(200).send({
                    message: 'Parking HouseFull !',
                    status: 200
                })
            }

        }
        // console.log(totalParkingSpace);

    } catch (error) {
        res.send({
            status: 500,
            message: "error occure while isuess parking number"
        })
    }

    let carParkingData = new carParkingModel({
        name: req.body.name,
        mobile: req.body.mobile,
        carNumber: req.body.carNumber,
        status: 'parked',
        parkingAlotNumber: parkingAlot
    })
    carParkingData.save().then((data) => {
        res.setHeader('content-type', 'application/json');
        res.send({
            success: "user Details is inserted !",
            data: data,
            status: 200
        });
    }).catch((err) => {
        res.status(500).send({
            message: err || "Some error occurred while inserting the user carDetails.",
            status: 500
        });
    })


}

// get all parking status
exports.getAllParkedStatus = (req, res) => {

    carParkingModel.find().then((data) => {
        res.send({
            message: data,
            status: 200
        });
    }).then((err) => {
        res.status(500).send({
            message: err,
            status: 500
        });
    })
}

// Get Parking alot status by name or carNumber

exports.parkedStatusByName = (req, res) => {

    if (!req.query.name && !req.query.carNumber) {
        return res.status(400).send({
            message: "please enter name/carNumber",
            status: 400
        });
    }

// Find carParked status by name or carNumber 

    carParkingModel.find({ $or: [{ "name": { $regex: `${req.query.name}`, $options: "i" } }, { "carNumber": { $regex: `${req.query.carNumber}`, $options: "i" } }] }).then((data) => {
        if (data) {
            res.status(200).send({
                message: data,
                status: 200,
            })
        } else {

            res.send({
                message: 'Not Found !',
                status: 404
            });

        }

    }).catch((err) => {
        res.status(500).send({
            message: err,
            status: 500
        });
    })
}

// Unparking car here...

exports.unParkedStatus = (req, res) => {

    if (!req.query || JSON.stringify(req.query) == "{}") {
        return res.status(400).send({
            message: "Request query can not be empty please enter name/car's number",
            status: 400
        });
    }
    if (!req.query.name && !req.query.carNumber) {
        return res.status(400).send({
            message: "please enter name/carNumber",
            status: 400
        });
    }

    carParkingModel.findOneAndUpdate({ $or: [{ "name": req.query.name }, { "carNumber": req.query.carNumber }] }, { "status": 'unparked', "updatedAt": new Date(), "parkingAlotNumber": 0 }, { new: true })
        .then((data) => {
            res.status(200).send({
                message: "successfully car is unparked",
                name: data.name,
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: err,
                status: 500
            })
        })
}

// get all unparked car status

exports.carStatus = (req, res) => {

    carParkingModel.find({ "status": 'unparked' }).select({ name: 1, _id: 0, status: 1, mobile: 1, carNumber: 1, updatedAt: 1 })
        .then((data) => {
            res.status(200).send({
                message: "Car Unparked Details",
                name: data,
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: err,
                status: 500
            })
        })

}