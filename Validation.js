//Valistaion 
const Joy = require('joi');

//Registration validation 
const  registrationValidation = (data) =>{
    const validateSchema = Joy.object({
        name: Joy.string()
        .min(3)
        .required(),
    email: Joy.string()
        .min(6)
        .email()
        .required(),
    password: Joy.string()
        .min(6)
        .required()
    });

    return validateSchema.validate(data);
}

//Login data validation
const  loginValidation = (data) =>{
    const validateSchema = Joy.object({
    email: Joy.string()
        .min(6)
        .email()
        .required(),
    password: Joy.string()
        .min(6)
        .required()
    });

    return validateSchema.validate(data);
}

//Create subscritpion validation 
const SubscriptionValidation = (data) => {
    const validateSchema = Joy.object({
        plan: Joy.string().valid('Bronze','Silver','Gold','Platinum','Titanium').required()
    });

    return validateSchema.validate(data);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.SubscriptionValidation = SubscriptionValidation;