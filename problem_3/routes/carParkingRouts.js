const express = require("express");
const router = express.Router();
const UsersController = require("../controller/carParkingController");
router.post("/", UsersController.carParking);
router.get('/getAll',UsersController.getAllParkedStatus);
router.get('/getByName',UsersController.parkedStatusByName)
router.get('/getUnparkedStatus',UsersController.carStatus);
router.put('/unparked',UsersController.unParkedStatus)
module.exports = router;