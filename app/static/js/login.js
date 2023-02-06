// =========================================== //
// Login Page
// =========================================== //

"use strict";

// Data
const user1 = {
    username: "tj",
    pin: 1111
};
const user2 = {
    username: "np",
    pin: 2222
};
const user3 = {
    username: "hn",
    pin: 3333
};
const userData = [user1, user2, user3];


// Store DOM elements in variables
const inputLoginUsername = document.querySelector(".login_input--user");
const inputLoginPin = document.querySelector(".login_input--pin");
const btnLogin = document.querySelector(".login_btn");
const containerApp = document.querySelector(".app");
const loginPage = document.querySelector(".login-page");


// Event handler
let currentUser;

btnLogin.addEventListener("click", function(e){

    // Upon login find the account in the data
    currentUser = userData.find(user => user.username === inputLoginUsername.value);
    // console.log(currentUser);
    
    // Check username exists and check pin is correct
    if(currentUser?.pin === Number(inputLoginPin.value)){

        // Hide login page
        loginPage.style.visibility = "hidden";

        // Display UI
        containerApp.style.visibility = "visible";

        
    } 
})

