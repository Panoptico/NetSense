var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: process.env.NETSENSE_EMAIL,
    pass: process.env.NETSENSE_EMAIL_PASSWORD
  }
});

var sendEmail = function(to, subject, message){

  var mailOptions = {
    from: "NetSense <NetSenseHR@gmail.com>",
    // to is a comma separated string for multiple recipients
    to: to,
    subject: subject,
    text: message,
  };

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error) return console.error(error);
    console.log("Message sent: " + response.message);
  });
};

module.exports = sendEmail;