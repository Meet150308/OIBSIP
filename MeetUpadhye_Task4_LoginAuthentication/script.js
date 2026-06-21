function registerUser(){

    const username =
        document.getElementById("regUsername").value.trim();

    const password =
        document.getElementById("regPassword").value.trim();

    if(username === "" || password === ""){

        alert("Please fill all fields.");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Registration Successful!");
}

function loginUser(){

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const storedUsername =
        localStorage.getItem("username");

    const storedPassword =
        localStorage.getItem("password");

    if(username === storedUsername &&
       password === storedPassword){

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";
    }
    else{

        alert("Invalid Username or Password!");
    }
}