// How is this for tables and columns
// Users        Posts        Topics
// ==============================================
// id           id              id
// username    topicid        authorid
// firstName   authorid       topic
// lastName    post
// email
module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

        body: {
            type: DataTypes.TEXT,
            allowNull:false
            
        },
     
    });
  
    Post.associate = function(models) {
   
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      // Post.belongsTo(models.Topic, {
      //   foreignKey: {
      //     allowNull: false
      //   }
      // });
    };
    return Post;
  };
  