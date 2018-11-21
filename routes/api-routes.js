
// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function (app) {

    // create a new user  --- worked
    app.post("/api/users/newUser", function (req, res) {
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });


    // get all the information, including users' info and post of the user  --- worked
    app.get("/api/users", function (req, res) {
        db.User.findAll({
            include: [db.Post]
        }).then(function (dbUser) {
            res.json(dbUser);
        })
    });

    //post a new post 
    app.post("/api/posts", function (req, res) {
        db.Post.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    //get this user's post
    app.get("/api/users/:id", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // GET route for getting all of the posts  -------- worked
    app.get("/api/posts", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.User
        db.Post.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });


    // PUT route for updating posts
    app.put("/api/posts", function (req, res) {
        db.Post.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // delete the post
    app.delete("/api/posts/:id", function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost)
        });
    });


    //create a new topic   ------ worked
    app.post("/api/topics", function (req, res) {
        db.Topic.create(req.body).then(function (dbTopic) {
            res.json(dbTopic);
        });
    });

}


