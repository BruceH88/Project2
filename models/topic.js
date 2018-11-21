module.exports = function(sequelize, DataTypes) {
    var Topic = sequelize.define("Topic", {

        topic: {
            type: DataTypes.STRING,
            
        }
     
    });
  
    Topic.associate = function(models) {

      Topic.hasMany(models.Post, {
        foreignKey: {
          allowNull: false
        }
      });
    //   Topic.hasMany(models.User, {
    //     onDelete: "cascade"
    // });
    };
  
    return Topic;
  };
  