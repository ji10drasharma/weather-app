const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

let apiKey = process.env.API_KEY; //my api key for openweathermap.org
let city = "pokhara";

//console.log(apiKey);

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

/* 
request returns a callback function with three agruments error, response and body
 */
request(url, function(error, response, body) {
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.
});