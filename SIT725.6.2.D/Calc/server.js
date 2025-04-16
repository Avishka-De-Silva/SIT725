// server.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Calculator logic
const calculate = (operation, a, b) => {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    default:
      throw new Error("Invalid operation");
  }
};

// API endpoint to perform calculations
app.get("/calculate", (req, res) => {
  const { operation, a, b } = req.query;
  if (!a || !b || isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid or missing parameters" });
  }

  try {
    const result = calculate(operation, parseFloat(a), parseFloat(b));
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Serve static files for the frontend (just index.html)
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
