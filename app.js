const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// const accessKey = 'LEyZb8BzCGMGyqpM'
mongoose.connect("mongodb+srv://Almat:" + process.env.MONGO_ATLAS_PW +"@ajcluster-ox4qt.mongodb.net/test")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.error('Connection failed');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/list", (req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
})

app.use("/hello", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
})

module.exports = app;
