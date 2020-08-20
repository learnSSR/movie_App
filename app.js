var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");



app.get("/",function(req , res){
	res.render("search");
});

app.get("/results",function(req , res){
    
    console.log(req.query.search);
    var search = req.query.search;
	request("http://www.omdbapi.com/?s=" + search + "&apikey=thewdb",function(error, response, body){
			if (!error && response.statusCode == 200)
			{
				var data = JSON.parse(body);
				//console.log(results);
				
				res.render("results",{data:data});
			}
	});

});

app.listen(3000,function(){
     console.log("server is running");
});

