const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// Route to get all food items
router.get("/", foodController.getAllFood);

// Route to show the Add Food form
router.get("/addFood", (req, res) => {
  res.render("addFood"); // Render the Add Food form
});

// Route to add a new food item (POST request)
router.post("/addFood", foodController.createFood);

// Route to edit a food item (GET request to load data)
router.get("/editFood/:id", foodController.getFoodById);

// Route to update a food item (POST request to update data)
router.post("/editFood/:id", foodController.updateFood);

// Route to delete a food item (GET request)
router.get("/deleteFood/:id", foodController.deleteFood);

module.exports = router;
