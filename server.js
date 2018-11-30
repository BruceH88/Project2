// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");
// =======================================================
// chat: requirements
var server = require("http").Server(app);//built in with express??
var io = require("socket.io")(server);// socket.io

//========================================================

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Routes
// =============================================================
require("./routes/login-api-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// chat:========================================================
// on connection with client run cb function
io.on("connection", function (socket) {
  // on receiving the data named "joinThisRoom" from client creates and joins the chat room with topicname received from client 
  socket.on("joinThisRoom", function (roomName) {
    socket.join(roomName)
  })
  // on receiving message from client console log the message
  // socket. is used for single and io. is used for everyone
  socket.on("message", function (data) {
    console.log("received messAGE", data);
    // send the received "message" back to client and named as "new-message" 
    // to display the conversation going on in chat window
    io.to(data.topic).emit('new-message', data);
  });
});


// ======================================================
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  // as we have used server here for socket.io we will use server.listen instead of app.listen
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
