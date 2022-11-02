const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
var ObjectId = require("mongoose");

//Getting all 
router.get("/", async (req, res) => {
    try {
        const restaurant = await Restaurant.find();
        console.log("Triggered");
        res.status(200).json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Geting One
router.get("/:id", getRestaurant, (req, res) => {
    try {
        res.status(200).json(res.restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Creating one
router.post("/", async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        ratings: req.body.ratings,
    });
    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Updating One
router.put("/:id", getRestaurant, async (req, res) => {
    if (req.body.name != null || req.body.name != undefined) {
        res.restaurant.name = req.body.name;
    }

    if (req.body.address != null || req.body.address != undefined) {
        res.restaurant.address = req.body.address;
    }

    if (req.body.ratings != null || req.body.ratings != undefined) {
        res.restaurant.ratings = req.body.ratings;
    }

    try {
        const updatedRestaurant = await res.restaurant.save();
        res.json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Deleting One
router.delete("/:id", getRestaurant, async (req, res) => {
    try {
        if (res.restaurant !== null && res.restaurant !== undefined) {
            await res.restaurant.remove();
            res.json({ message: "Deleted Restaurant" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getRestaurant(req, res, next) {
    let restaurant;
    try {
        if (!ObjectId.isValidObjectId(req.params.id)) {
            return res.status(404).json({ message: "Invalid ID is provided" });
        } else {
            restaurant = await Restaurant.findById(req.params.id);
            if (restaurant == null) {
                return res
                    .status(400)
                    .json({ message: "Can't find restaurant" });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.restaurant = restaurant;
    next();
}

module.exports = router;
