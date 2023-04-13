// global variables for site
const apiKey = "";
const currentUrlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forecastUrlStart = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const urlEnd = '&appid=';

// Add event listener to form
document.getElementById("city-search").addEventListener("submit", function(event) {
    event.preventDefault();
    var cityInput = document.getElementById("city").value;
    var currentUrl = currentUrlStart + cityInput + urlEnd + apiKey;
    var forecastUrl = forecastUrlStart + cityInput + urlEnd + apiKey;
    // Use fetch to make API call to OpenWeatherMap API for current weather
    fetch(currentUrl)
    .then(response => response.json())
    .then(data => {
        const current = data;
        // Get the div where the current weather will be displayed
        const currentDiv = document.getElementById("current-weather");
        // Clear the div before displaying new weather
        currentDiv.innerHTML = "";
        // Create elements for each piece of information
        const cityElem = document.createElement("h2");
        cityElem.textContent = current.name;
        const dateElem = document.createElement("p");
        dateElem.textContent = new Date().toLocaleDateString();
        const tempElem = document.createElement("p");
        tempElem.textContent = "Temperature: " + current.main.temp + "F";
        const humidityElem = document.createElement("p");
        humidityElem.textContent = "Humidity: " + current.main.humidity + "%";
        const windElem = document.createElement("p");
        windElem.textContent = "Wind Speed: " + current.wind.speed + " MPH";
        // Append the elements to the current weather div
        currentDiv.appendChild(cityElem);
        currentDiv.appendChild(dateElem);
        currentDiv.appendChild(tempElem);
        currentDiv.appendChild(humidityElem);
        currentDiv.appendChild(windElem);
    })
    .catch(error => console.log(error));

     // Use fetch to make API call to OpenWeatherMap API for 5-day forecast
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        const forecast = data.list;
        // Get the div where the forecast will be displayed
        const forecastDiv = document.getElementById("five-day");
        // Clear the div before displaying new forecast
        forecastDiv.innerHTML = "";
        for (let i = 0; i < forecast.length; i++) {
            // Create a new div for each forecast
            const forecastElem = document.createElement("div");
            forecastElem.innerHTML = forecast[i].dt_txt + ": " + forecast[i].main.temp + "F";
            // Append the forecast to the forecast div
            forecastDiv.appendChild(forecastElem);
        }

        // Store the search query in local storage
        const previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
        previousSearches.push(cityInput);
        localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
        // Display the previous searches
        displayPreviousSearches();
    })
    .catch(error => console.log(error));
});

// Display the previous searches
function displayPreviousSearches() {
    const previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
    const searchHistoryDiv = document.getElementById("search-history");
    searchHistoryDiv.innerHTML = "";
    for (let i = 0; i < previousSearches.length; i++) {
        const searchElem = document.createElement("div");
        searchElem.innerHTML = previousSearches[i];
        // Add event listener to search history
        searchElem.addEventListener("click", function() {
            var currentUrl = currentUrlStart + previousSearches[i] + urlEnd + apiKey;
            var forecastUrl = forecastUrlStart + previousSearches[i] + urlEnd + apiKey;
            // Use fetch to make API call to OpenWeatherMap API for current weather
            fetch(currentUrl)
            .then(response => response.json())
            .then(data => {
                const current = data;
                // Get the div where the current weather will be displayed
                const currentDiv = document.getElementById("current-weather");
                // Clear the div before displaying new weather
                currentDiv.innerHTML = "";
                // Create elements for each piece of information
                const cityElem = document.createElement("h2");
                cityElem.textContent = current.name;
                const dateElem = document.createElement("p");
                dateElem.textContent = new Date().toLocaleDateString();
                const tempElem = document.createElement("p");
                tempElem.textContent = "Temperature: " + current.main.temp + "F";
                const humidityElem = document.createElement("p");
                humidityElem.textContent = "Humidity: " + current.main.humidity + "%";
                const windElem = document.createElement("p");
                windElem.textContent = "Wind Speed: " + current.wind.speed + " MPH";
                // Append the elements to the current weather div
                currentDiv.appendChild(cityElem);
                currentDiv.appendChild(dateElem);
                currentDiv.appendChild(tempElem);
                currentDiv.appendChild(humidityElem);
                currentDiv.appendChild(windElem);
            })
            .catch(error => console.log(error));

            // Use fetch to make API call to OpenWeatherMap API for 5-day forecast
            fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                const forecast = data.list;
                // Get the div where the forecast will be displayed
                const forecastDiv = document.getElementById("five-day");
                // Clear the div before displaying new forecast
                forecastDiv.innerHTML = "";
                for (let i = 0; i < forecast.length; i++) {
                    // Create a new div for each forecast
                    const forecastElem = document.createElement("div");
                    forecastElem.innerHTML = forecast[i].dt_txt + ": " + forecast[i].main.temp + "F";
                    // Append the forecast to the forecast div
                    forecastDiv.appendChild(forecastElem);
                }
            })
            .catch(error => console.log(error));
        });
        searchHistoryDiv.appendChild(searchElem);
    }
}