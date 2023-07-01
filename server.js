require('dotenv').config();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// import routes
const transactionRoutes = require('./routes/transactions').default
const balanceRoutes = require('./routes/balance')
const userRoutes = require('./routes/user').default

// express app
const app = express();

// static server
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

// let's app use routes
app.use(transactionRoutes, balanceRoutes, userRoutes)

// connect to infinity-bank db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
        console.log('connected to db & listening on port', process.env.PORT)
       })
   })
   .catch((error) => {
        console.log(error)
   })