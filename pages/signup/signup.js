import { API_URL } from "../../settings.js"
import { handleHttpErrors } from "../../utils.js"


const URL = API_URL + "/members"




export function initSignup() {
    document.getElementById("btn-signup").onclick = signup
}

async function signup(evt) {
    evt.preventDefault()
    const username = document.getElementById("input-username").value
    const email = document.getElementById("input-email").value
    const password = document.getElementById("input-password").value
    const gender = document.getElementById("input-gender").value
    const age = document.getElementById("input-age").value
    const weight = document.getElementById("input-weight").value
    const goal = document.getElementById("input-goal").value

    const user = { username, email, password, gender, age, weight, goal }
    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
    }
    try {
        await fetch(URL, options).then(handleHttpErrors)
        window.router.navigate("/login?msg=" + "You have successfully signed up. Please login")
    } catch (err) {
        //You should present user with error message
        console.error(err.message);
    }


}