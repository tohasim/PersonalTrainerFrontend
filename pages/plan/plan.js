import { API_URL } from "/settings.js"

var numberOfWeeks = 7;

export async function initPlan() {
	const options = {
		method: "Get",
		headers: { "Accept": "application/json" }
	}
	const token = localStorage.getItem("token")
	if (!token) {
		return
	}

	options.headers.Authorization = "Bearer " + token
	var data = await fetch(API_URL + "/trainer/create-plan?username=" + localStorage.getItem("user"), options)
		.then((response) => response.json())

	var answer = data.answer;
	// Populate user info
	document.getElementById("goal").innerHTML = answer.goal;
	document.getElementById("age").innerHTML = answer.age;
	document.getElementById("gender").innerHTML = answer.gender;
	document.getElementById("weight").innerHTML = answer.weight;

	// Generate fitness plan table
	generateFitnessPlanTable(answer);
}

// Function to generate the table
function generateFitnessPlanTable(data) {
	var table = document.getElementById("fitness-plan");
	var innerHTML = `
	<thead> 
		<tr>
			<th></th>`;
	for (var i = 1; i <= 7; i++) {
		innerHTML += `<th>Week ${i}</th>`;
	}
	innerHTML += `</tr>
	</thead>`;
	table.innerHTML = innerHTML;
	for (var day in data.fitness_plan) {
		var headerRow = table.insertRow();
		var cellDay = headerRow.insertCell(0);
		cellDay.innerHTML = `<b>${data.fitness_plan[day].name}</b>`;

		for (var i = 1; i <= 7; i++) {
			headerRow.insertCell(i);
		}

		var exercises = data.fitness_plan[day].exercises;
		exercises.forEach(function (exercise) {
			var execiseRow = table.insertRow();
			var nameCell = execiseRow.insertCell(0);
			nameCell.innerHTML =
				exercise.name +
				" (Sets: " +
				exercise.sets +
				", Reps: " +
				exercise.reps +
				")";

			for (var i = 1; i <= 7; i++) {
				execiseRow.insertCell(i);
			}
		});
	}
}
