$(function() {
  $(".postSubmit").on("click", function(event){
    console.log("submit was clicked");

    // const topic = "1";  //$("#topicInput").data("id");
    const post = $("#postInput");

    const newPost = {
      posts: post
    };


    $.post("/api/post", function(newPost) {

    }).then(
      function(result) {
        console.log(result);
        // Reload the page to get the updated list
        location.reload();
      }
    );


  })
});