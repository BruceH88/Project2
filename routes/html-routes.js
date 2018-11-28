// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // blog route loads blog.html
  app.get("/posts", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/posts.html"));
  });

  app.get("/topics", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/inTopic.html"));
  });


  // signup route takes you to page to sign up
  app.get("/signup", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/assets/index.html"));
    res.render("signup");
  });

  // default route takes you to the login page
  app.get("/", function (req, res) {
    if (req.user) {
      return res.redirect("/api/posts");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
    // res.render("login");
  });

};
