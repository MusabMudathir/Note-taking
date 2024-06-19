const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Notes = require("./models/Notes");
const notesRoute = require("./routes/notesRoute");

const mongoUrl = "mongodb+srv://software:gk6LT9zbYUvnjUCK@cluster2.3huriej.mongodb.net/?retryWrites=true&w=majority";


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE ,PUT');
  
    next();
  });


  app.use('/api/notes', notesRoute);
  
  mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(5005);
  })
  .catch((err) => {
    console.log(err);
  });

