var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds041144.mlab.com:41144/heroku_fk6rj50x');
var models_path = __dirname + '/../models'

fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') > 0) {
    	require(models_path + '/' + file);
	}
});