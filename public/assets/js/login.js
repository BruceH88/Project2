$(document).ready(function () {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const signupForm = $("form.signup");
  const userNameInput = $("#username-input");
  const passwordInput = $("#password-input");
  const firstNameInput = $("#firstname-input");
  const lastNameInput = $("#lastname-input");
  const emailInput = $("#email-input");

  loginForm.on("submit", function (event) {
    console.log("Login clicked")
    event.preventDefault();

    // When the form is submitted, we validate there's an username and password entered
    var userData = {
      userName: userNameInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    // console.log(userData)
    if (!userData.userName || !userData.password) {
      alert("Please Enter Valid Log in Details")
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData);
    userNameInput.val('');
    passwordInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the posts page
  function loginUser(userData) {
    console.log("calling api");
    console.log(userData);
    $.post("/api/login", 
      userData
    ).then(function (data) {
      sessionStorage.setItem("username", userData.userName);
      console.log(data);
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      sessionStorage.clear();
      console.log(err);
    });
  }

  // signup and and a new user to user table
  signupForm.on("submit", function (event) {
    console.log("Sign up clicked")
    event.preventDefault();
    // When the form is submitted, we validate there's an email and password entered
    var userData = {
      userName: userNameInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim()
    };

    console.log(userData);
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.email) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signupUser(userData);
    userNameInput.val('');
    passwordInput.val('');
    firstNameInput.val('');
    lastNameInput.val('');
    emailInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function signupUser(userData) {
    console.log("Add user");
    $.post("/api/signup", 
      userData
    ).then(function (data) {
      sessionStorage.setItem("username", userData.userName);
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      sessionStorage.clear();
      console.log(err);
    });
  }

});
