const nodemail = require('nodemailer');
const dotenv = require('dotenv').config();


var sendMail = async function (toData, subscritpion_id){
try{
    let testAccount = await nodemail.createTestAccount();
console.log('insdie send mail');

var Transporter = nodemail.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EmailUserName,
        pass: process.env.EmailPassward
    }
 });

    var mailOptions = {
        from: process.env.EmailUserName,
        to:toData,
        subject:"Subscriont Registration Receipt",
        Text:"Congrations your subsription registration with the subscritpion_id: "+subscritpion_id+" is succefully registered at our side!"
    };
    console.log('sending mail')
    Transporter.sendMail(mailOptions,function (error, info) {
       if(error){
           console.log("Error sending mail: "+error);
       } 
       else{
           console.log('Emain sent: '+ info.response);
       }
    });
}
catch(error){
    console.error(error);
}
}

module.exports = sendMail;