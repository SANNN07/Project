
// user validation

function userValidation(users){
  users.forEach((user) => {
      var userInputEmail = document.getElementById("userEmail").value;
      var userInputPassword = document.getElementById("userPassword").value; 
  if(user.email == userInputEmail && user.password == userInputPassword){ 
      document.getElementById('signInMsg').innerHTML = `User Logged In` 
      const isAuthenticated = true;
      console.log("users from server", user); 
  } else  document.getElementById('signInMsg').innerHTML = `Invalid email or password`     
   })
}



// getting user info from server
function fetchUser() {
    fetch("http://localhost:4005/user/login", {
        method: "GET",
        node: "cors",
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          const users = data;
          userValidation(users)
        })
        .catch((error) => console.error(error.message));
  }
  
// sign up message
  function userMsg() {
    var userSignUpEmail = document.getElementById("signUpEmail").value;
    var userSignUpPassword = document.getElementById("signUpPassword").value; 
    if( userSignUpEmail && userSignUpPassword){
        document.getElementById('signUpMsg').innerHTML = `Account created successfully` 
    }
  }

