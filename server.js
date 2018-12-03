const express = require('express');
const bodyPraser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const { sessionKey } = require('./keys');

mongoose.connect('mongodb://creater:asdfasdfasdf123@ds111895.mlab.com:11895/cosmetic-place', 
    {
        useNewUrlParser: true
    },
    (err) => {
        if(err) return console.log(err);
        console.log('__[ Connected MongoDB ]__');
    }
);

const app = express();

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: sessionKey
}));

app.get('/', (req, res) => res.send('All is ok'));

app.use('/api/auth', require(path.resolve(__dirname, 'api', 'auth')));

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if(err) return console.log(error)
    console.log('__[ Server started ]__')
});
