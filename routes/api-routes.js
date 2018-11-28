
// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function (app) {

    // all the routers for the users 
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

    // get all the information, including users' info and post of the user  --- worked
    app.get("/api/users", function (req, res) {
        db.User.findAll({
            include: [db.Post]
        }).then(function (dbUser) {
            res.json(dbUser);
        })
    });

    // Done in login-api-routes.js
    // // create a new user  --- worked
    // app.post("/api/users/newUser", function (req, res) {
    //     db.User.create(req.body).then(function (dbUser) {
    //         res.json(dbUser);
    //     });
    // });


    // All the routes for Posts
    // GET route for getting all of the posts  -------- worked
    app.get("/api/posts", function (req, res) {
        if (!req.user) {
            return res.redirect("/");
        }

        db.Post.findAll({
            include: [db.User, db.Topic]
        }).then(function (dbPosts) {
            console.log(JSON.stringify(dbPosts));
            res.render("index", { posts: dbPosts });
        });

    });

    app.get("/api/posts/topics/:id", function(req, res){
        if (!req.user) {
            return res.redirect("/");
        }
        
        db.Post.findAll({
            where: {
                TopicId: req.params.id
            },
            include: [db.User, db.Topic]
        }).then(function (dbPosts) {
            dbPosts.topicData = {
                topicName: "Testing",
                topicId: req.params.id
            }
            console.log(JSON.stringify(dbPosts));
            res.render("index", { posts: dbPosts });
        });
    })

    // app.get("/api/posts", function (req, res) {
    //     var query = {};
    //     if (req.query.user_id) {
    //         query.UserId = req.query.user_id;
    //     }
    //     // Here we add an "include" property to our options in our findAll query
    //     // We set the value to an array of the models we want to include in a left outer join
    //     // In this case, just db.User
    //     db.Post.findAll({
    //         where: query,
    //         include: [db.User]
    //     }).then(function (dbPost) {
    //         console.log(dbPost);
    //         res.render(dbPost);
    //         // res.json(dbPost);
    //     });
    // });

    //post a new post 
    app.post("/api/posts", function (req, res) {
        db.Post.create(req.body).then(function (dbPost) {
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

    // All the routes for Topics
    // GET route for getting all of the topics
    app.get("/api/topics", function (req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        db.Topic.findAll().then(function (dbTopics) {
            console.log(JSON.stringify(dbTopics));
            res.render("topic", { topics: dbTopics });
        });
    });

    //create a new topic   ------ worked
    app.post("/api/topics", function (req, res) {
        db.Topic.create(req.body).then(function (dbTopic) {
            res.json(dbTopic);
        });
    });


}


