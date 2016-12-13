var express = require('express');
var router = express.Router();
// Authorisation
var ConnectRoles = require('connect-roles');
var roles = new ConnectRoles();

/* GET home page. */
// anyone can access
router.get('/', function(req, res, next) {
	res.render('frontend/mygraph');
});



module.exports = router;
