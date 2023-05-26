const express=require('express');
const app=express();
const bodyparser=require("body-parser")
app.use(bodyparser())
const nodemail=require('nodemailer');
const cors=require('cors');
app.use(cors());
var sendcode="";

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
var smtpcon={
    host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bhadreshkolichauhan57@gmail.com',
            pass: 'ppybdrikhybmmtgs'
        }
}

var transporter = nodemail.createTransport(smtpcon);

app.post("/test",(req,res)=>{
   console.log(req.body)
})

app.post("/sendmail",(req,res)=>{
    var a=req.body.username;    
   
    sendcode=generateOTP();

    var text = "Dear " + a + "<br /><br />"
    text+="This mail is sent by the Pdf Parsing System<br/>"
    text += "<h3>"+"Your Verification Code is : "+"</h3>"+"<h1>" + sendcode +"</h1>"+ "<br />";
    text += "PLEASE DO NOT DISCLOSE THIS VERIFICATION CODE TO ANYONE BY ANY MEANS. This is for online use by you only.<br /><br />";
    text += "Thank you,<br />"
    text += "Pdf Parsing System Team"

    var subject = 'Sign Up Verification code send by Pdf Parsing Sysytem.';
    var mailOptions = {
        from: 'bhadreshkolichauhan57@gmail.com', // sender address
        to: a, // list of receivers
        subject: subject, // Subject line
        html: text
    };

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            // callback(error);
        }
        else {
            console.log("Email Sent");
            res.send({msg:"email is send",Status:"Ok"});
        }
    })
    function generateOTP() {
          
        // Declare a digits variable 
        // which stores all digits
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
   
});

app.post("/verifyemail",(req,res)=>{
    console.log(sendcode)
    const userverifycode=req.body.emailcode;
    if(sendcode==userverifycode){
        res.send({msg:"email is verify",Status:"OK"})
    }
    else{
        res.send({msg:"error",Status:"Bad Request"})
    }
})










const PORT =5555;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})