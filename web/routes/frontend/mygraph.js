var express = require('express');
var router = express.Router();
// Authorisation
var roles = require('../../config/authorisation')

/* GET home page. */
// anyone can access
router.get('/', roles.can('access public app'), function(req, res, next) {
	res.render('frontend/mygraph');
});



module.exports = router;
