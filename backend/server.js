require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes
const transactionRoutes = require('./routes/transactions')
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user')

// express app
const app = express();

// static server
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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

// connect to infinity-bank db
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
   .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
        console.log('connected to db & listening on port', process.env.PORT)
       })
   })
   .catch((error) => {
        console.log(error)
   })