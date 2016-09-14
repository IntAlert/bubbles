'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scrape = sequelize.define('Scrape', {
    start: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Scrape;
};