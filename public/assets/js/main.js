// chat requirements
var socket = io.connect("http://localhost:8080");
var chat;
var roomsArray = []
var userName = 'Dhanu90';
var topics = [];

// =================CHAT===============================
// hiding chat window initially
$(".chatWindow").hide()

// EVENT LISTENER : for chat button
// 1. grabs the topic name stores it in variable 
// 2. hides chat icon and shows chat window
$(".openChat").on("click", function(){
  var topicName = $("#topic-name").attr("data-name")
  console.log("here"+ topicName)
  $(".openChat").hide();
  $(".chatWindow").show()
  // Emits the topicname to the server and name (event)it "joinThisRoom"
  socket.emit("joinThisRoom", topicName)

  // EVENT LISTENER  : for send button
  // grabs the text in input tag and stores it in variable
  $("#send").on("click",function() {
    chat = $(".type").val();
    user = sessionStorage.getItem("username")
    console.log("console" + chat);
    // Emits the chat and topicname to the server as an object and name (event)it "message"  
    socket.emit("message", { chat: chat, topic:topicName, user:user});
    $(".type").val("")
  })
})
// var user = $("#displayUserName").val()
$(".min").on("click",function(){
  $(".chatWindow").hide();
  $(".openChat").show();
})

// on receiving the data named "new-message" from server puts it to the chat window
socket.on("new-message", function(data){
    console.log("back", data)
    $(".chat-area").append(data.user, ": ", data.chat, "<br>")
  })
// ====================================== CHAT ENDS HERE ===============================
$(function () {
  $(".postSubmit").on("click", function (event) {
    console.log("post submit was clicked");

    const userId = 1;
    const topicId = $("#topic-name").data("id");
    const post = $("#postInput").val().trim();

    const newPost = {
      body: post,
      UserId: userId,
      TopicId: topicId
    };

    $.post("/api/posts",
      newPost
    ).then(
      function (result) {
        console.log(result);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".topicSubmit").on("click", function (event) {
    console.log("topic submit was clicked");

    const topic = $("#topicInput").val().trim();
    const newTopic = {
      topic: topic,
    };

    $.post("/api/topics",
      newTopic
    ).then(
      function (result) {
        console.log(result);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


})

$("#chat-input").keypress(function (bevent) {
  var keycode = bevent.keyCode || bevent.which;
  if (keycode == '13') {
    $("#send").trigger("click");
    $("#chat-input").val('');
  }
});
// })

$(document).ready(function () {
  $("#displayUserName").append(`<a href="/users/1">${sessionStorage.getItem("username")}</a>`);
});