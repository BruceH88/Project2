$(function () {
  $(".postSubmit").on("click", function (event) {
    console.log("submit was clicked");

    const userId = 1;  
    const topicId = 1;  //$("#topicInput").data("id");
    const post = $("#postInput").val().trim();

    const newPost = {
      body: post,
      UserId: userId,
      TopicId: topicId
    };
    console.log("newPost object");
    console.log(newPost);
    $.post("/api/posts",
      newPost
    ).then(
      function (result) {
        console.log(result);
        // Reload the page to get the updated list
        location.reload();
      }
    );


  })
});