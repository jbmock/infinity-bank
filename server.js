require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

// import routes
const transactionRoutes = require('./routes/transactions')
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user')

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

// let's app use routes
app.use('/api/transactions', transactionRoutes) 
app.use('/api/balance', balanceRoutes)
app.use('/api/user', userRoutes)

// static server
const path = require('path');
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

// connect to infinity-bank db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
   .then(() => {
    // listen for requests
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`connected to db & listening on port ${PORT}`)
       })
   })
   .catch((error) => {
        console.log(error)
   })