'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fb_id: DataTypes.STRING,
    lastScraped: DataTypes.DATE,
    displayName: DataTypes.TEXT,
    gender: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Tag, { 
          through: models.TagUser 
        })
        User.hasMany(models.TagUser)
      }
    }
  });
  return User;
};