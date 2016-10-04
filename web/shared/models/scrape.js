'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scrape = sequelize.define('Scrape', {
    user_count: DataTypes.INTEGER,
    friendship_count: DataTypes.INTEGER,
    complete: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Scrape.hasMany(models.Friendship);
      }
    }
  });
  return Scrape;
};