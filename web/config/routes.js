// Public
var frontend_index = require('../routes/frontend/index');
var frontend_auth = require('../routes/frontend/auth');
var frontend_mygraph = require('../routes/frontend/mygraph');

// Admin
var admin_index = require('../routes/admin/index');
var admin_auth = require('../routes/admin/auth');

// API
var api_scrapes = require('../routes/api/scrapes');
var api_friendships = require('../routes/api/friendships');
var api_users = require('../routes/api/users');
var api_tags = require('../routes/api/tags');

var initRoutes = function(app) {
	// PUBLIC routes
	app.use('/', frontend_index);
	app.use('/frontend/auth', frontend_auth);
	app.use('/frontend/mygraph', frontend_mygraph);

	// ADMIN routes
	app.use('/admin', admin_index);
	app.use('/admin/auth', admin_auth);

	// API routes
	app.use('/api/scrapes', api_scrapes);
	app.use('/api/friendships', api_friendships);
	app.use('/api/users', api_users);
	app.use('/api/tags', api_tags);

	// Jade Partials for directives
	app.get('/partials/directives/:name', function (req, res) { 
	  var name = req.params.name;
	  res.render('partials/directives/' + name);
	});

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});	
}


module.exports = initRoutes