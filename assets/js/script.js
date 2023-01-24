// global variables for site
const apiKey = "";
const forecastUrlStart = 'https://api.openweathermap.org/data/2.5/forecast?q='
const forecastUrlEnd = '&appid='

// Add event listener to form
document.getElementById("city-search").addEventListener("submit", function(event) {
    event.preventDefault();
    var cityInput = document.getElementById("city").value;
    var forecastUrl = forecastUrlStart + cityInput + forecastUrlEnd + apiKey;
    // Use fetch to make API call to OpenWeatherMap API
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