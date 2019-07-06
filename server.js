const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("index", { weather: null, error: null });
});

let apiKey = process.env.API_KEY; //my api key for openweathermap.org

app.post("/", function(req, res) {
  let city = req.body.city;
  //console.log(req.body.city);
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  request(url, function(error, response, body) {
    if (error) {
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      let info = JSON.parse(body);
      console.log(info);
      if (info.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again"
        });
      } else {
        let message = `It's ${info.main.temp} degrees in ${info.name}, ${
          info.sys.country
        }!`;
        res.render("index", { weather: message, error: null });
      }
    }

    //console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    //console.log("body:", body); // Print the HTML for the url given.

    //console.log(info);
  });
});

app.listen(process.env.PORT || 3000);
