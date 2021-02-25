const router = require('express').Router();
const verify = require('./verifyToken');
const Subscription = require('../Models/Subscriptions');
const {SubscriptionValidation} = require('../Validation');
const sendMail = require('./sendMail');


//Get the susbscription from the ID - route
router.get('/:id', verify, (req,resp) => {
    Subscription.findOne({_id:req.params.id})
    .then((response) => {
        resp.status(200).send(response);
    })
    .catch((error) => {
        resp.status(404).send('Subscription not found');
    });
});

//Create subscritption Route
router.post('/', verify, (req,resp) => {

    //Validation of requet body.
    const {error} = SubscriptionValidation(req.body);
    if(error) {resp.status(400).send(error.details[0].message);}

    //Check if subscritpion already there for the user.
    Subscription.findOne({user_id:req.user.id, plan:req.body.plan})
    .then((response) => {
        if(response) { 
            //Subscription for that user is alredy existin send error 
            resp.status(400).send('Subscription alredy exist for the user');
        }
        else{
            //subscritpion is not registered for the user, create a new subscritpion.

            const subscritpion = new Subscription();
            subscritpion.user_id = req.user.id;
            subscritpion.plan = req.body.plan;
        
            //Updating Data to mongo 
            subscritpion.save()
            .then((response) => {
                resp.status(200).send('Subscription created - subscription_id: ' +response._id);
                sendMail('praveengn.is16@rvce.edu.in',"sub_alshdfkbsdnvk");
            })
            .catch((error) => {
                resp.status(500).send('Error creating subscription: ' +error);
            })
        }
    })
    .catch((error) => {
        resp.status(500).send('Error finding subscirption details');
        console.log('Error connecting to BD: ' + error);
    })
    
});

module.exports = router;