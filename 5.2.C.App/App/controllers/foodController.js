const Food = require('../models/food'); // Import Food model

// GET all food items
exports.getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();  // Fetch all food items from the database
    res.render('index', { foods });   // Render the index.ejs view and pass the foods data
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving food items');
  }
};

// GET a single food item for editing
exports.getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    res.render('editFood', { food });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving food item for editing');
  }
};

// POST to add a new food item
exports.createFood = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newFood = new Food({ name, price });
    await newFood.save(); // Save the new food item to the database
    res.redirect('/'); // Redirect to the home page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding food item');
  }
};

// POST to update an existing food item
exports.updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    await Food.findByIdAndUpdate(id, { name, price }); // Update the food item
    res.redirect('/');  // Redirect to the home page after updating
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating food item');
  }
};

// GET to delete a food item
exports.deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    await Food.findByIdAndDelete(id);  // Delete the food item
    res.redirect('/');  // Redirect to the home page after deleting
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting food item');
  }
};