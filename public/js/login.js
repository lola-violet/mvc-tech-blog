// const { json } = require("express/lib/response");

console.log("login linked");

document.querySelector("#loginBtn").addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value,
    }
    console.log(userObj);
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href="/dashboard"
        } else {
            alert("OOPS")
        }
    }).catch(err => {
        throw err;
    })
});

document.querySelector("#signupBtn").addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value,
    }
    console.log(userObj);
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href="/dashboard"
            console.log("account created")
        } else {
            alert("OOPS")
        }
    }).catch(err => {
        throw err;
    })
});