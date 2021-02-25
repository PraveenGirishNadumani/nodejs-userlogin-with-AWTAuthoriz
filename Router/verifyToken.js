 const jwt = require('jsonwebtoken');


 //Midleware function for validating the auth-token
module.exports = function(req,resp,next){
    
    const token = req.header('auth-token');
    if(!token){resp.status(401).send('Token mssing!');}

    try{
        const verify = jwt.verify(token,process.env.TOKEN_SERCRETE);
        req.user = verify;
        next();
    }
    catch(error){
        resp.status(500).send('error: '+error);
    }
}