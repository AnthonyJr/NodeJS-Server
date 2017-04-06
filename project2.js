// Anthony Snow Project 2 
var regexCGI = /[a-zA-Z0-9]*.cgi/; 
var regexHTML = /[a-zA-Z0-9]*.html/; 

var http = require("http"); 
var url = require("url"); 
var fs = require("fs"); 
var ourEnv = {'PATH': "./CGIDIR/"}; 
var paul   = require('/homes/paul/HTML/CS316/p2_req.js'); 
const exec = require('child_process').exec;


const hostname = 'pen.cs.uky.edu'; 
const RANDOMPORT = Math.floor((Math.random() * paul.pend()) + paul.pstart());


// create the server
var server = http.createServer(myprocess()); // this is step 1; 

server.listen(RANDOMPORT,hostname, mylisten()); 

function myprocess(request, response){
	if (request.url === '/favicon.ico') {
	    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
	    response.end();
	    return;
	}

	var page; 
	var data = request.url;
	if (regexCGI.test(data) === true){
		page = runCGI(data); 

	} else if (regexHTML.test(data) === true){
		page = runHTML("PUBLIC/" + data.toString()); 
	} else {
		console.log("Invalid file type"); 
	}
	response.end(page); 


}

function mylisten(){
	console.log("listening on port: " + RANDOMPORT);
	console.log("running on server: " + hostname); 
}





function runCGI(mydata){  
	var info;
	console.log("running CGI file from: " + mydata +"....");
	if (doesFileExistTho("./CGIDIR/" + mydata) === true) {
		exec(mydata.substring(1), {env: ourEnv}, function(error, stdout){
			if (error){
				console.error('exec error'+error);
				console.log("you have an error. That sucks"); 
				return; 
			}

			console.log('stdout:' + stdout); 
			return stdout; 


		});
	}

} 

function runHTML(mydata){
	console.log("running HTML file from: " + mydata + "..."); 
	if (doesFileExistTho(mydata) === true) {
		var content = fs.readFileSync(mydata.toString(), 'utf8'); 
		return content;  // how do you go cgi foreal
	} else{
		console.log("File does not exist. Try Again."); 
	}
	
}

function doesFileExistTho(mydata){ // checks to see if file exists. 
	console.log("Checking to see if file exists...."); 
	if (fs.existsSync(mydata) === true) {
		console.log("FOUND");
		return true; 
	} else {
		console.log("NOT FOUND"); 
		return false; 
	}
}






