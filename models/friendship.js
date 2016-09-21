'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friendship = sequelize.define('Friendship', {
    friend1_id: DataTypes.STRING,
    friend2_id: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Friendship.belongsTo(models.Scrape);
        
      }
    }
  });
  return Friendship;
};