const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('../../models/users');
const Validator = require('./Validator');
const { jwtKey } = require('../../keys');

router.post('/signup', async(req, res) => {
    const { email, password, name } = req.body;

    if(Validator.init(email).isEmail()) {
        if(Validator.init(password).LengthMore(5)) {
            if(Validator.init(name).LengthMore(4)) {

                try {

                    const user = await Users.findOne({email});
    
                    if(user) {
                        return res.status(412).json({
                            signup: false, massage: "Email already exist"
                        }); 
                    }

                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(password, salt);

                    try {
                        const newUser = await new Users({
                            name, email, password: hashedPassword
                        }).save();

                        res.status(200).json({
                            signup: true
                        });

                    } catch (error) {
                        console.log(error);
                        res.json({signup: false, massage: 'Error, try again later'});
                    }

                } catch (error) {
                    res.json({signup: false, massage: 'Error, try again later'});
                }

            } else {
                res.json({signup: false, massage: 'Name must be at least 5 characters'});
            }
        } else {
            res.json({signup: false, massage: 'Password must be at least 6 characters'});
        }
    } else {
        res.json({signup: false, massage: 'Invalid email address'})
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    if(Validator.init(email).isEmail()) {
        if(Validator.init(password).LengthMore(5)) {

            try {

                const user = await Users.findOne({email});

                if(email) {

                    const isMatch = bcrypt.compareSync(password, user.password);

                    if(isMatch) {

                        const token = jwt.sign({id: user._id}, jwtKey);
                        
                        req.session.token = token;

                        res.status(200).json({login: true});
                    } else {
                        res.json({login: false, massage: "Incorrect password"});
                    }

                } else {
                    res.json({
                        login: false,
                        massage: 'Email does not exist'
                    });
                }

            } catch (error) {
                res.json({signup: false, massage: 'Error, try again later'});
            }

        } else {
            res.json({login: false, massage: 'Password must be at least 6 characters'});
        }
    } else {
        res.json({login: false, massage: 'Invalid email address'})
    }
});

router.post('/check', async(req, res) => {

    jwt.verify(req.session.token, jwtKey, (err, payload) => {
        if(err) {
            return res.json({auth: false});
        }

        res.status(200).json({auth: true})
    });

});

router.post('/logout', (req, res) => {
    req.session.token = null;
    res.status(200).json({logout: true});
});

module.exports = router;