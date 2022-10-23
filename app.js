const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { dirname } = require("path");
app.use(bodyParser.urlencoded({extended:true}));

var cityName;
// app.get('/',function(req, res){
    
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Allahabad&appid=1669c15b9bad5ae2aa200710f82a1d4a&units=metric";
//     https.get(url, function(response){
//         response.on("data", function(data){
//             console.log("satus code: "+response.statusCode)
           
//             const weatherData = JSON.parse(data);
//             console.log(`temperature ${weatherData.main.temp}`);
//             console.log("pressure: "+weatherData.main.pressure); 
//             // temperature = weatherData.main.temp;
            
//             res.write("<h1>The temperature in allahabad is "+weatherData.main.temp+" degrees celsius.</h1>"
//             +"<h1>weather description: "+weatherData.weather[0].description+"</h1>");
            
//             const imgurl = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";
//             res.write("<img src="+imgurl+">");
            
//             res.send();
//         });
//     });     
// });

app.get('/', function(req, res){
    // var sourceFile = --dirname+"/index.html";
    // above line is error .........assignme to const variable........

    res.sendFile(__dirname+"/index.html");
});
app.post('/', function(req, res){
     const appkey = "1669c15b9bad5ae2aa200710f82a1d4a";
     var unit = "metric";
     cityName = req.body.city;
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ appkey+"&units="+ unit +"";
     https.get(url, function (response) {
        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            res.write("<h1>"+weatherData.name+"</h1>");
            res.write("<br>temperature: "+weatherData.main.temp+" degrees celcius");
            res.write("<br>weather description: "+weatherData.weather[0].description);
            var imagesrc = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";
            res.write("<br><img src="+imagesrc+">");
            res.send();
        });
     });
});


app.listen(3000, function(){
    console.log("server is running at port 3000");
});