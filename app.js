// npx nodemon app.js

const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");

app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": firstName,
            "LNAME": lastName
        }
    }
    const jsonData = JSON.stringify(data);
    const url = 'https://us8.api.mailchimp.com/3.0/lists/8b79aef9d4/members'
    const post_options = {
        auth: "sighkrs1996@gmail.com:158af350f22defc99acb54db6e24dffb-us8",
        method: 'POST',
    };
    const post_request = http.request(url, post_options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on('data', function (data) {
        //     console.log(JSON.parse(data));
        // });
    });
    post_request.write(jsonData);
    post_request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on 3000");
});


//158af350f22defc99acb54db6e24dffb-us8 api-key
//8b79aef9d4 listid