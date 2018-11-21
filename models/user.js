module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
       
        userName: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        passwords:{
            type:DataTypes.INTEGER
        }
    });

    User.associate = function (models) {
       
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
        // User.hasMany(models.Topic, {
        //     onDelete: "cascade"
        // });
        
    };

    return User;
};