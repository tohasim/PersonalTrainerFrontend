var numberOfWeeks = 7;

export function initPlan() {
	fetch("pages/plan/plan.json")
		.then((response) => response.json())
		.then((data) => {
			var answer = data.answer;
			// Populate user info
			document.getElementById("goal").innerHTML = answer.goal;
			document.getElementById("age").innerHTML = answer.age;
			document.getElementById("gender").innerHTML = answer.gender;
			document.getElementById("weight").innerHTML = answer.weight;

			// Generate fitness plan table
			generateFitnessPlanTable(answer);
		});
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
