'use strict';
module.exports = function(sequelize, DataTypes) {
  var TagUser = sequelize.define('TagUser', {
  	
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return TagUser;
};