var ConnectRoles = require('connect-roles');

// Authorisation
var roles = new ConnectRoles();

// anonymous users can only access the home page
// roles.use(function (req, action) {
//   if (!req.isAuthenticated()) return action === 'access home page';
// })

// logged in public users can only access public stuff
roles.use('access public app', function (req) {
  return req.isAuthenticated()
})

// admin
roles.use('access admin app', function (req) {
  return req.user.is_admin && req.user.is_admin_approved
})

module.exports = roles;