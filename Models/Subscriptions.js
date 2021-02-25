const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({

    user_id:String,
    subscription_id:String,
    plan:String,
    start_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);