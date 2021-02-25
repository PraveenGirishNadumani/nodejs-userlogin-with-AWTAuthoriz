const route = require('express').Router();
const verify = require('./verifyToken');
const User = require('../Models/User');
const Subscription = require('../Models/Subscriptions');


//Get user details with fetch api call to the endpooint api/profile
route.get('/',verify, async (req,resp) => {
    // resp.send(req.user.id);
    const getUser = await User.findOne({_id:req.user.id});
    
    resp.send(getUser);
});

//Get all the subscription details of a user making a GET api call to api/user/subscritpion

route.get('/subscritpion', verify, (req,resp) => {

    Subscription.find({user_id:req.user.id})
    .then((response) => {
        resp.status(200).send(response);
    })
    .catch((error) => {
        resp.status(500).send('Error whiel fetching subscritpino details: '+ error);
        console.error(error);
    })
});


module.exports = route;