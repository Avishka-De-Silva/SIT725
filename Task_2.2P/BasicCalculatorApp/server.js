var express = require("express");
const path = require("path");

var app = express();
var port = process.env.port || 3003;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// calculating the sum
app.get("/sum", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send(
      "Error: Please provide valid numbers using query parameters 'num1' and 'num2'."
    );
  }

  const sum = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is: ${sum}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
