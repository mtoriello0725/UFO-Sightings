// from data.js
var tableData = data;
// identify tbody as the d3 select for tbody tag
var tbody = d3.select("tbody");

// Select button tag for input:
var enter = d3.select("#filter-btn");

// ----- Filter according to input text:

enter.on("click", function() {

	// Remove all rows in current table
	var prevRows = d3.selectAll("td").remove()

	// prevent page refresh
 	d3.event.preventDefault();

 	var filteredData = tableData;

	// collect inputs entered
	var inputDate = d3.select("#datetime").property("value");
	var inputState = d3.select("#state").property("value");
	var inputShape = d3.select("#shape").property("value");

	// filter tableData according to inputs
	// Can also use cases instead of if statements, but this allows for multiple filters
	if (inputDate != "") {
		var filteredData = filteredData.filter(sighting => sighting.datetime === inputDate);
	};
	if (inputState != "") {
		var filteredData = filteredData.filter(sighting => sighting.state === inputState);
	};
	if (inputShape != "") {
		var filteredData = filteredData.filter(sighting => sighting.shape === inputShape);
	};
// console.log(filteredData)
	// run a function to append table
	filteredData.forEach(function(sighting) {
// console.log(sighting)
		var row = tbody.append("tr");
		Object.entries(sighting).forEach(function([key,value]) {

			var cell = row.append("td").attr("class", key);
			// $(this).addClass(key);
			cell.text(value);
		});
	});

});

// Add sorting for column headers!

function sortTable(dt) {
	d3.selectAll(".state").sort(function(x,y) {
		return d3.ascending(x, y);
	});
}

// Things to try: 

// display the table when the website is refreshed
// create function for enter.on seperate from the event

// when sorting, recreate the entire table: 
// when the button for sorting is clicked, filter the data table
//  - however remember the previous input values so sorting does not make a whole new table
 