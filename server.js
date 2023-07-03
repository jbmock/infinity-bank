require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// import routes
const transactionRoutes = require('./routes/transactions')
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user')

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

// let's app use routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/balance', balanceRoutes)
app.use('/api/user', userRoutes)

// static server
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// connect to infinity-bank db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
   .then(() => {
    // listen for requests
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log('connected to db & listening on port', port)
       })
   })
   .catch((error) => {
        console.log(error)
   })