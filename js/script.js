// global variables for site
const apiKey = "";
const currentUrlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forecastUrlStart = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const urlEnd = '&appid=';

// Add event listener to form
document.getElementById("city-search").addEventListener("submit", async function(event) {
	event.preventDefault();
	const cityInput = document.getElementById("city").value;
	const currentUrl = currentUrlStart + cityInput + urlEnd + apiKey;
	const forecastUrl = forecastUrlStart + cityInput + urlEnd + apiKey;

	try {
		// Use fetch to make API call to OpenWeatherMap API for current weather
		const currentResponse = await fetch(currentUrl);
		const currentData = await currentResponse.json();
		const current = currentData;

		// Get the div where the current weather will be displayed
		const currentDiv = document.getElementById("current-weather");
		// Clear the div before displaying new weather
		currentDiv.innerHTML = "";
		// Create elements for each piece of information
		const cityElem = document.createElement("h2");
		cityElem.textContent = current.name;
		const dateElem = document.createElement("p");
		dateElem.textContent = new Date().toLocaleDateString();
		const tempKelvin = current.main.temp;
		const tempCelsius = Math.round(tempKelvin - 273.15);
		const tempElem = document.createElement("p");
		tempElem.textContent = "Temperature: " + tempCelsius + "°C";
		const humidityElem = document.createElement("p");
		humidityElem.textContent = "Humidity: " + current.main.humidity + "%";
		const windMetersPerSecond = current.wind.speed;
		const windKmPerHour = Math.round(windMetersPerSecond * 3.6);
		const windElem = document.createElement("p");
		windElem.textContent = "Wind Speed: " + windKmPerHour + " km/h";
		// Append the elements to the current weather div
		currentDiv.appendChild(cityElem);
		currentDiv.appendChild(dateElem);
		currentDiv.appendChild(tempElem);
		currentDiv.appendChild(humidityElem);
		currentDiv.appendChild(windElem);

		// Use fetch to make API call to OpenWeatherMap API for 5-day forecast
const forecastResponse = await fetch(forecastUrl);
const forecastData = await forecastResponse.json();
const forecast = forecastData.list;

// Get the div where the forecast will be displayed
const forecastDiv = document.getElementById("five-day");
// Clear the div before displaying new forecast
forecastDiv.innerHTML = "";

// Loop through the forecast data and create a new card for each day
for (let i = 0; i < forecast.length; i+=8) {
    // Create a new div for each forecast
    const forecastElem = document.createElement("div");
    forecastElem.className = "col-md-2";
    const cardElem = document.createElement("div");
    cardElem.className = "card text-center";
    const cardHeaderElem = document.createElement("div");
    cardHeaderElem.className = "card-header";
    cardHeaderElem.textContent = new Date(forecast[i].dt_txt).toLocaleDateString();
    const cardBodyElem = document.createElement("div");
    cardBodyElem.className = "card-body";

    // Create a table to display the temperature and time for each 3-hour interval
    const tableElem = document.createElement("table");
    tableElem.className = "table table-bordered";
    const tableHeadElem = document.createElement("thead");
    const tableHeadRowElem = document.createElement("tr");
    const tableHeadCell1Elem = document.createElement("th");
    const tableHeadCell2Elem = document.createElement("th");
    tableHeadCell1Elem.textContent = "Time";
    tableHeadCell2Elem.textContent = "Temperature";
    tableHeadRowElem.appendChild(tableHeadCell1Elem);
    tableHeadRowElem.appendChild(tableHeadCell2Elem);
    tableHeadElem.appendChild(tableHeadRowElem);
    const tableBodyElem = document.createElement("tbody");
    for (let j = i; j < i + 8; j++) {
        const tableRowElem = document.createElement("tr");
        const timeElem = document.createElement("td");
        const tempElem = document.createElement("td");
        const tempKelvin = forecast[j].main.temp;
        const tempCelsius = Math.round(tempKelvin - 273.15);
        timeElem.textContent = new Date(forecast[j].dt_txt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        tempElem.textContent = tempCelsius + "°C";
        tableRowElem.appendChild(timeElem);
        tableRowElem.appendChild(tempElem);
        tableBodyElem.appendChild(tableRowElem);
    }
    tableElem.appendChild(tableHeadElem);
    tableElem.appendChild(tableBodyElem);

    // Append the header and table to the card body
    cardBodyElem.appendChild(tableElem);
    cardElem.appendChild(cardHeaderElem);
    cardElem.appendChild(cardBodyElem);

    // Append the card to the forecast div
    forecastElem.appendChild(cardElem);
    forecastDiv.appendChild(forecastElem);
}

          

		// Store the search query in local storage
		const previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
		previousSearches.push(cityInput);
		localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
		// Display the previous searches
		displayPreviousSearches();
	} catch (error) {
		console.log(error);
	}
})

// Display the previous searches
async function displayPreviousSearches() {
	const previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
	const searchHistoryDiv = document.getElementById("search-history");
	searchHistoryDiv.innerHTML = "";
	for (let i = 0; i < previousSearches.length; i++) {
		const searchElem = document.createElement("div");
		searchElem.innerHTML = previousSearches[i];
		// Add event listener to search history
		searchElem.addEventListener("click", async function() {
			const currentUrl = currentUrlStart + previousSearches[i] + urlEnd + apiKey;
			const forecastUrl = forecastUrlStart + previousSearches[i] + urlEnd + apiKey;
			try {
				// Use fetch to make API call to OpenWeatherMap API for current weather
				const currentResponse = await fetch(currentUrl);
				const currentData = await currentResponse.json();
				const current = currentData;

				// Get the div where the current weather will be displayed
				const currentDiv = document.getElementById("current-weather");
				// Clear the div before displaying new weather
				currentDiv.innerHTML = "";
				// Create elements for each piece of information
				const cityElem = document.createElement("h2");
				cityElem.textContent = current.name;
				const dateElem = document.createElement("p");
				dateElem.textContent = new Date().toLocaleDateString();
				const tempKelvin = current.main.temp;
				const tempCelsius = Math.round(tempKelvin - 273.15);
				const tempElem = document.createElement("p");
				tempElem.textContent = "Temperature: " + tempCelsius + "°C";
				const humidityElem = document.createElement("p");
				humidityElem.textContent = "Humidity: " + current.main.humidity + "%";
				const windMetersPerSecond = current.wind.speed;
				const windKmPerHour = Math.round(windMetersPerSecond * 3.6);
				const windElem = document.createElement("p");
				windElem.textContent = "Wind Speed: " + windKmPerHour + " km/h";
				// Append the elements to the current weather div
				currentDiv.appendChild(cityElem);
				currentDiv.appendChild(dateElem);
				currentDiv.appendChild(tempElem);
				currentDiv.appendChild(humidityElem);
				currentDiv.appendChild(windElem);

				// Use fetch to make API call to OpenWeatherMap API for 5-day forecast
const forecastResponse = await fetch(forecastUrl);
const forecastData = await forecastResponse.json();
const forecast = forecastData.list;

// Get the div where the forecast will be displayed
const forecastDiv = document.getElementById("five-day");
// Clear the div before displaying new forecast
forecastDiv.innerHTML = "";

// Loop through the forecast data and create a new card for each day
for (let i = 0; i < forecast.length; i+=8) {
    // Create a new div for each forecast
    const forecastElem = document.createElement("div");
    forecastElem.className = "col-md-2";
    const cardElem = document.createElement("div");
    cardElem.className = "card text-center";
    const cardHeaderElem = document.createElement("div");
    cardHeaderElem.className = "card-header";
    cardHeaderElem.textContent = new Date(forecast[i].dt_txt).toLocaleDateString();
    const cardBodyElem = document.createElement("div");
    cardBodyElem.className = "card-body";

    // Create a table to display the temperature and time for each 3-hour interval
    const tableElem = document.createElement("table");
    tableElem.className = "table table-bordered";
    const tableHeadElem = document.createElement("thead");
    const tableHeadRowElem = document.createElement("tr");
    const tableHeadCell1Elem = document.createElement("th");
    const tableHeadCell2Elem = document.createElement("th");
    tableHeadCell1Elem.textContent = "Time";
    tableHeadCell2Elem.textContent = "Temperature";
    tableHeadRowElem.appendChild(tableHeadCell1Elem);
    tableHeadRowElem.appendChild(tableHeadCell2Elem);
    tableHeadElem.appendChild(tableHeadRowElem);
    const tableBodyElem = document.createElement("tbody");
    for (let j = i; j < i + 8; j++) {
        const tableRowElem = document.createElement("tr");
        const timeElem = document.createElement("td");
        const tempElem = document.createElement("td");
        const tempKelvin = forecast[j].main.temp;
        const tempCelsius = Math.round(tempKelvin - 273.15);
        timeElem.textContent = new Date(forecast[j].dt_txt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        tempElem.textContent = tempCelsius + "°C";
        tableRowElem.appendChild(timeElem);
        tableRowElem.appendChild(tempElem);
        tableBodyElem.appendChild(tableRowElem);
    }
    tableElem.appendChild(tableHeadElem);
    tableElem.appendChild(tableBodyElem);

    // Append the header and table to the card body
    cardBodyElem.appendChild(tableElem);
    cardElem.appendChild(cardHeaderElem);
    cardElem.appendChild(cardBodyElem);

    // Append the card to the forecast div
    forecastElem.appendChild(cardElem);
    forecastDiv.appendChild(forecastElem);
}

                  
			} catch (error) {
				console.log(error);
			}
		});

		searchHistoryDiv.appendChild(searchElem);
	}
}