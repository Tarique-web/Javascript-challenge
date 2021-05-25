
const mongoose = require("../config/db");
const schema = new mongoose.Schema(

    {
        name: {
            desc: "The user's name.",
            trim: true,
            type: String,
            required: true,
        },
        mobile: {
            desc: "The user's mobile no",
            trim: true,
            type: Number,
            
        },
      
        carNumber: {
            desc : "the users car details", 
            trim: true,
            type: String,

        },

        parkingAlotNumber:{
            desc : "the users issues parking Number", 
            trim: true,
            type: Number,
        },

        status: {
            desc : "the users car parked/unparked", 
            trim: true,
            type: String,

        }
    },
    {
       
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }

)
module.exports = mongoose.model("parkingDetails", schema);