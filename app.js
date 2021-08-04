const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//Code used to make photos available via Node
app.use(express.static("public"));

app.get("/signup", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/signup", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);
    
    
})

app.listen(3000, function(req, res){
    console.log("Server is running on port 3000.");
})

