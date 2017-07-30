var profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var fs = require("fs");
function css(request, response) {
  if (request.url.indexOf(".css") !== -1){
    var file = fs.readFileSync('./styles/main.css', {'encoding' : 'utf8'});
    response.writeHead(200, {'Content-Type' : 'text/css'});
    response.write(file);
    response.end();
  }
} 

function home(request, response){
 //Handle HTTP route GET / and POST 
//if url === "/" && GET
	//show search
	if (request.url === '/') {
    if(request.method.toLowerCase() == "get"){
  		response.writeHead(200, {"Content-Type": "text/html"});
  		
  		renderer.view("header",{}, response);
  		renderer.view("search",{}, response);
  		renderer.view("footer",{}, response);
  		response.end();
  	}else{
      request.on("data",function(postBody){
        var query = querystring.parse(postBody.toString());
        response.writeHead(303,{"location":"/"+query.username})
        response.end();
      });
    }
  }
	
	//if url === "/" && POST
		// redirect to /:username
}
 //Handle HTTP route GET /username i.e /miladthecomputerguy
function user(request,response){
	//if url="/...."
	var username = request.url.replace("/", "");

	if(username.length > 0 && request.url.indexOf('.css') === -1){
		response.writeHead(200, {"Content-Type": "text/html"});
  		renderer.view("header",{}, response);

  		var studentProfile = new profile(username);	
  		studentProfile.on("end",function(profileJSON){
  			var values = {
  				avatarUrl:profileJSON.gravatar_url,
  				username:profileJSON.profile_name,
  				badgeCount:profileJSON.badges.length,
  				javascriptPoints:profileJSON.points.JavaScript
  			}
  			renderer.view("profile",values, response);
  			renderer.view("footer",{}, response);
  			response.end();
  		});
  		studentProfile.on("error", function(error){
  			renderer.view("error",{errorMessage:error.message}, response);
  			renderer.view("search",{}, response);
  			renderer.view("footer",{}, response);
  			response.end();
  		});
	}
}

module.exports.css = css;
module.exports.home = home;
module.exports.user = user;