const mongoose = require("mongoose");

// Define a schema for the food items
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

// Create a model based on the schema
const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
