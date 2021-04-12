const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const eMail = req.body.email;
  const data = {
    members: [{
      email_address: eMail,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/66hdf4de37";

  const options = {
    method: "POST",
    auth: "username:gsdfgd675657653vdfgdfgsfgsdf-us9"
  }
  const request = https.request(url, options, function(response) {
    if  (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});



app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port: 3000");
})
