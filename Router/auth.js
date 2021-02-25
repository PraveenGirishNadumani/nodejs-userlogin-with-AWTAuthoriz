const User = require('../Models/User');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginValidation, registrationValidation} = require('../Validation');


//User registration Route, 
router.post('/register', async (req,resp) =>{

    //Validation of req.body
    const {error} = registrationValidation(req.body);
    if(error) {resp.status(400).send(error.details[0].message);}

    //Checking if the user is alredy in DB
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) {resp.status(400).send('mail already exist');}


    //Generate password Has
    const salt = await bcrypt.genSalt(10);
    const hashPassward = await bcrypt.hash(req.body.password,salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassward
    });

    try{
        const savedUser = await user.save();
        resp.status(200).send({user: savedUser._id});
    }
    catch(error){
        resp.status(500).send('error saving the user: '+error);
    }

});


//user login Route, and get the auth token in the API response
router.post('/login', async (req,resp) => {

    //Validate the Data before we proccess it 
    const {error} = loginValidation(req.body);
    if(error) {resp.status(400).send(error.details[0].message);}

    //Checking if the user is there in DB
    const user = await User.findOne({email:req.body.email});
    if(!user) {resp.status(401).send('Email doest exist');}

    //Validating password 
    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if(!validpassword){ resp.status(401).send('Wrong password!');}
    console.log('3, from validation schema')

    //Generating and asing a AWT token to the authorized user
    const token = await jwt.sign({id: user._id},process.env.TOKEN_SERCRETE);
    resp.header('auth-token', token).status(200).send('Longin success: '+user.name);


});

module.exports = router;