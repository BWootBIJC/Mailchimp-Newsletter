const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const app = express();
const authentication = require("./authentication")


//This must be used to get data from a post
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
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }    
    const jsonData = JSON.stringify(data);
    const url = `https://us5.api.mailchimp.com/3.0/lists/${authentication.listId}`;
    const options = {
        method: "POST",
        auth: `Bryant Wooters:${authentication.apiKey}`,
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            if(response.statusCode >= '200' && response.statusCode <= '299'){
                res.sendFile(__dirname + '/success.html');
            }
            else{
                res.sendFile(__dirname + '/failure.html');
            }
        })
    })
    request.write(jsonData);
    request.end();
})


app.listen(3000, function(req, res){
    console.log("Server is running on port 3000.");
})


