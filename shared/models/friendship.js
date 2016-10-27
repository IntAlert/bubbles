'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friendship = sequelize.define('Friendship', {
    friend1_id: {
      type: DataTypes.STRING,
      unique: 'directionalFriendship'
    },
    friend2_id: {
      type: DataTypes.STRING,
      unique: 'directionalFriendship'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Friendship.belongsTo(models.Scrape);

        // associate friend 1
        Friendship.belongsTo(models.User, {
          as: 'Friend1',
          foreignKey: 'friend1_id',
          targetKey: 'fb_id'
        });

        // associate friend 2
        Friendship.belongsTo(models.User, {
          as: 'Friend2',
          foreignKey: 'friend2_id',
          targetKey: 'fb_id'
        });
        
      },
      getAllByScrapeId: function(scrapeId, models) {
        return this.findAll({
          attributes: [], // we don't need anything from the join table
          where: {
            ScrapeId: scrapeId
          },
          include: [{
          model: models.User,
          attributes: ['id', 'fb_id', 'displayName', 'gender'],
          as: 'Friend1',
          include: [{
            attributes: ['id', 'name'],
            model: models.Tag
          }]
          }, {
            model: models.User,
            attributes: ['id', 'fb_id', 'displayName', 'gender'],
            as: 'Friend2',
            include: [{
              attributes: ['id', 'name'],
              model: models.Tag
            }]
          }]
        })
      }




    }
  });
  return Friendship;
};


