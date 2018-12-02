const express = require('express');
const bodyPraser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Shahnoza'
}));

app.get('/', (req, res) => res.send('All is ok'));

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if(err) return console.log(error)
    console.log('__[ Server started ]__')
});
