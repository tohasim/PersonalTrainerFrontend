//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo.js"; //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below
import { setActiveLink, loadHtml, renderHtml } from "./utils.js";
import { initLogin, logout, toggleLoginStatus } from "./pages/login/login.js";
import { initSignup } from "./pages/signup/signup.js";
import { initPlan } from "./pages/plan/plan.js";

window.addEventListener("load", async () => {
	const templateNotFound = await loadHtml("./pages/notFound/notFound.html");
	const templateSignup = await loadHtml("./pages/signup/signup.html");
	const templateLogin = await loadHtml("./pages/login/login.html");
	const templatePlan = await loadHtml("./pages/plan/plan.html");

	//If token existed, for example after a refresh, set UI accordingly
	const token = localStorage.getItem("token");
	toggleLoginStatus(token);
	const router = new Navigo("/", { hash: true });
	//Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
	window.router = router;

	router
		.hooks({
			before(done, match) {
				setActiveLink("menu", match.url);
				done();
			},
		})
		.on({
			"/": () =>
				(document.getElementById("content").innerHTML = `
        <h2>Welcome, to the future of personalized training!</h2>
        `),
			"/signup": () => {
				renderHtml(templateSignup, "content");
				initSignup();
			},
			"/login": () => {
				renderHtml(templateLogin, "content");
				initLogin();
			},
			"/logout": () => {
				renderHtml(templateLogin, "content");
				logout();
			},
			"/plan": () => {
				renderHtml(templatePlan, "content");
				initPlan();
			},
		})
		.notFound(() => {
			renderHtml(templateNotFound, "content");
		})
		.resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
	alert(
		"Error: " +
			errorMsg +
			" Script: " +
			url +
			" Line: " +
			lineNumber +
			" Column: " +
			column +
			" StackTrace: " +
			errorObj
	);
};
