
// Import the model (burger.js) to use its database functions.
var db = require("../models");
var moment = require("moment");


module.exports = function (app) {

    // all the routers for the users 
    //get this user's post
    // app.get("/api/users/:id", function (req, res) {
    //     db.User.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.Post]
    //     }).then(function (dbUser) {
    //         res.json(dbUser);
    //     });
    // });

    // get all the information, including users' info and post of the user  --- worked
    // app.get("/api/users", function (req, res) {
    //     db.User.findAll({
    //         include: [db.Post]
    //     }).then(function (dbUser) {
    //         res.json(dbUser);
    //     })
    // });


    // All the routes for Posts
    // GET route for getting all of the posts  -------- worked
    app.get("/api/posts", function (req, res) {
        if (!req.user) {
            return res.redirect("/");
        }

        db.Post.findAll({
            include: [db.User, db.Topic],
            order: [
                ['id', 'DESC']
            ]
        }).then(function (dbPosts) {
            var format = "YYYY-MM-DD";
            var hourmat = "hh:mm a";
            for (i = 0; i < dbPosts.length; i++) {
                dbPosts[i].newTimeStamp = `${moment(dbPosts[i].createdAt).format(format)} at ${moment(dbPosts[i].createdAt).format(hourmat)}`
            }
            console.log(JSON.parse(JSON.stringify(dbPosts)));

            res.render("index", { posts: dbPosts });
        });

    });

    app.get("/api/posts/topics/:id", function (req, res) {
        if (!req.user) {
            return res.redirect("/");
        }

        db.Post.findAll({
            where: {
                TopicId: req.params.id
            },
            include: [db.User, db.Topic],
            order: [
                ['id', 'DESC']
            ]
        }).then(function (dbPosts) {
            let topicName = "";
            if (dbPosts.length > 0) {
                topicName = dbPosts[0].Topic.topic;
            }
            const dbPostData = {
                topicData: { name: topicName, id: req.params.id },
                posts: dbPosts
            };
            // console.log(JSON.stringify(dbPostData));
            res.render("index", dbPostData);
        });
    })


    //post a new post 
    app.post("/api/posts", function (req, res) {
        req.body.UserId = req.user.id;
        // console.log(req.body);
        db.Post.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // PUT route for updating posts
    // app.put("/api/posts", function (req, res) {
    //     db.Post.update(
    //         req.body,
    //         {
    //             where: {
    //                 id: req.body.id
    //             }
    //         }).then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // });

    // delete the post
    // app.delete("/api/posts/:id", function (req, res) {
    //     db.Post.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (dbPost) {
    //         res.json(dbPost)
    //     });
    // });

    // All the routes for Topics
    // GET route for getting all of the topics
    app.get("/api/topics", function (req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        db.Topic.findAll({
            order: [
                ['id', 'DESC']
            ]
        }).then(function (dbTopics) {
            for (i = 0; i < dbTopics.length; i++) {
                var format = "YYYY-MM-DD";
                var hourmat = "hh:mm a";
                dbTopics[i].newTimeStamp = `${moment(dbTopics[i].createdAt).format(format)} at ${moment(dbTopics[i].createdAt).format(hourmat)}`
            }
            // console.log(JSON.stringify(dbTopics));
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


