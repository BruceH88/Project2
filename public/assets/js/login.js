$(document).ready(function () {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const usernameInput = $("#username-input");
  const passwordInput = $("#password-input");
  
  loginForm.on("submit", function (event) {
    console.log("Login clicked");
    event.preventDefault();
    window.location.replace("/api/posts");
  });

  // // When the form is submitted, we validate there's an email and password entered
  // loginForm.on("submit", function (event) {
  //   console.log("Login clicked")
  //   event.preventDefault();
  //   var userData = {
  //     username: usernameInput.val().trim(),
  //     password: passwordInput.val().trim(),
  //   };
  //   // console.log(userData)
  //   if (!userData.username || !userData.password) {
  //     return;
  //   }

  //   // If we have an email and password we run the loginUser function and clear the form
  //   loginUser(userData.username, userData.password);
  //   usernameInput.val('');
  //   passwordInput.val('');
  // });

  // // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  // function loginUser(username, password) {
  //   console.log("calling api")
  //   $.post("/api/login", {
  //     username: username,
  //     password: password,
  //   }).then(function (data) {
  //     // console.log(data);
  //     window.location.replace(data);
  //     // If there's an error, log the error
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // }

});
