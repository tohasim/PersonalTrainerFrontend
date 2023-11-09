export const API_URL =
	location.hostname === "localhost" || location.hostname === "127.0.0.1"
		? "http://localhost:8080/api"
		: "https://personaltrainerbackend.azurewebsites.net/api";

export const FETCH_NO_API_ERROR =
	" (Is the API online or did the endpoint exists ?)";
