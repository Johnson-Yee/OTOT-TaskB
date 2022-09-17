const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: false,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
