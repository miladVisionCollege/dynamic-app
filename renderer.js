var fs = require("fs");

function mergeValues(values, content){
	for(var key in values){
		content = content.replace("{{"+key+"}}",values[key]);
	}
	return content;
}
function view(templateName, values, response){
	//read template files
	var fileContents = fs.readFileSync("./views/"+ templateName+".html",{encoding:"utf8"});
		//insert values
	fileContents = mergeValues(values,fileContents);
		//write
	response.write(fileContents);
	
}
module.exports.view = view;