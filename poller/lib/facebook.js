var FB = require('fb');

module.exports = function(env) {

	console.log("Facebook, using the following creds: ")
	console.dir(env)


	var fb = new FB.Facebook({
		appId: env.FB_CLIENT_ID,
		appSecret: env.FB_CLIENT_SECRET
	});

	fb.setAccessToken(env.FB_ACCESS_TOKEN);

	return fb

};