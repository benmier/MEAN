module.exports = function(app){

	app.get('/', function(req, res) {
	    res.render('index')
	});

	app.get('#/customize_users', function(req, res) {
		console.log("hit")
	    res.render('customizeUsers.html')
	});
};