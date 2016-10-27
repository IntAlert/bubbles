'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fb_id: {
      type: DataTypes.STRING,
      unique: true
    },
    lastScraped: DataTypes.DATE,
    displayName: DataTypes.TEXT,
    gender: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING

    // Migration
    // is_admin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    // is_admin_approved: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Tag, { 
          through: models.TagUser,

        })
        User.hasMany(models.TagUser)
      }
    }
  });
  return User;
};