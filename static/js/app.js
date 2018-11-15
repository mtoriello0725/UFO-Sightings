function createTable(dataTable) {
	/*
	This function will create the table according to the
	data table input. If data from data.js is the input, 
	this will output the table with no filters or sorting.
	*/

	// Remove all rows in current table
	var prevRows = d3.selectAll("td").remove();

	// assign global variable to data to be displayed
	window.currentData = dataTable;

	// identify tbody as the d3 select for tbody tag
	var tbody = d3.select("tbody");	

	// run a function to append table	
	dataTable.forEach(function(sighting) {
	// console.log(sighting)
		var row = tbody.append("tr");
		Object.entries(sighting).forEach(function([key,value]) {

			var cell = row.append("td").attr("class", key);
			// $(this).addClass(key);
			cell.text(value);
		});
	});
};

function filterData(filteredData) {

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

	return filteredData;
}

function handleSubmit() {

	// prevent page refresh
 	d3.event.preventDefault();

 	// Define lastSort as empty. When a column is sorted, lastSort will change
 	window.lastSort = "";

	// run create table based on output of filter data
	createTable(filterData(tableData));
};

// Sort Data function: 
function sortTable(key) {

	if (lastSort != key) {
		lastSort = key;
		sortedData = currentData.slice().sort(function(a,b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
	else {
		lastSort = "";
		sortedData = currentData.slice().sort(function(a,b) {
			var x = a[key]; var y = b[key];
			return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		});
	};

	createTable(sortedData);
};

// When you First open the page:
// import data from data.js and create table
var tableData = data;

// Define lastSort as empty. When a column is sorted, lastSort will change
window.lastSort = "";

createTable(tableData);

// Select button tag for input:
var enter = d3.select("#filter-btn");

// When button is clicked, run handleSubmit
enter.on("click", handleSubmit);

