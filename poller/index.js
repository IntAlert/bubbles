var Q = require('q');
var fb = require('./lib/facebook')(process.env);
var models = require('./shared/models/');


var data = {
	scrape: null,
	users: [],
	friendLists: []
}

// For development/testing purposes
exports.handler = function( event, context, callback) {


	console.log('Starting with environment variables: ');

	// get all existing users
	getAllUsers()

	// create a scrape
	.then(createScrape)
	
	// batch get friends
	.then(getAllFriends)

	// save the friendships
	.then(saveFriendships)

	.then(function(){
		// mark scrape as complete
		console.log('complete')
		callback(null, true)
	})

}

function getAllUsers() {

	return models.User.findAll().then(function(users){

			data.users = users;

			console.log("Found " + users.length + " users")

	})
	
}

function createScrape() {
	return models.Scrape.create({}).then(function(scrape){
		data.scrape = scrape
	})
}

function getAllFriends() {

	var batch = []
	for (var i = 0; i < data.users.length; i++) {
		var user = data.users[i]
		batch.push({
			method: 'get',
			relative_url: user.fb_id + '/friends'
		})
	}

	// batch 'em
	console.log('Batching ' + batch.length + " FB requests");
	var deferred = Q.defer();
	fb.api('', 'post', { batch: batch }, function(res){


		if(!res || res.error) {
			deferred.reject(new Error(res.error));
			console.log("getAllFriends Error: ")
			console.log(res.error)
	    }

	    var totalFriendships = 0;
	    for (var i = res.length - 1; i >= 0; i--) {
	    	var friendList = JSON.parse(res[i].body).data;

	    	data.friendLists[i] = friendList;
	    	
	    	totalFriendships += friendList.length
	    }

	    console.log('FB Batch responded with ' + totalFriendships + " friendships")

	    deferred.resolve(data.friendLists)

	})

	console.log('waiting for FB Batch response')

	return deferred.promise


}

function saveFriendships() {

	console.log('save Friendships')

	var records = [];
	for (var i = data.friendLists.length - 1; i >= 0; i--) {

		var user = data.users[i];
		var friendList = data.friendLists[i];

		for (var j = friendList.length - 1; j >= 0; j--) {
			var friend = friendList[j]

			if (user.fb_id != friend.id)
				records.push({
					ScrapeId: data.scrape.id,
					friend1_id: user.fb_id,
					friend2_id: friend.id
				})
		}
		
	}

	console.log('Saving ' + records.length + ' Friendships')

	return models.Friendship.bulkCreate(records)
		.then(function() { // Notice: There are no arguments here, as of right now you'll have to...
			return models.Friendship.findAll({
				where: {
					ScrapeId: data.scrape.id
				}
			});
		})
}





