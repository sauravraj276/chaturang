const express = require('express')
const connectDB = require("./config/db");
const userRoutes = require("./api/user")
const cors = require('cors');
const port = 5000

const app = express()
app.use(cors());
connectDB();

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Register the logger middleware
app.use(logger);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Server is Online');
});
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Chaturang server listening on port ${port}`)
})