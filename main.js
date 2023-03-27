// My API Key : 3f5c2992-398f-46c4-b44c-fb61102a271b
const cityLocation = document.querySelector("#city");
const countryLocation = document.querySelector("#country");
const currentTemperature = document.querySelector("#temperature");
const weatherSVG = document.querySelector("#weatherSVG");
const loader = document.querySelector("#loader");
const errorMsg = document.querySelector("#errorMsg");

function initAPI(){
    initWeather();
}

initAPI();

async function initWeather() {

    try {
        const response = await fetch(`https://api.airvisual.com/v2/nearest_city?key=3f5c2992-398f-46c4-b44c-fb61102a271b`)
        const data = await response.json();

        if(data.status != "success") {
            throw new Error(`${response.status}`);
        }

        const temperatureAPI = data.data.current.weather.tp;
        const countryLocationAPI = data.data.country;
        const cityLocationAPI = data.data.city;
        const weatherSVGAPI = data.data.current.weather.ic
        addWeatherInfos(weatherSVGAPI, temperatureAPI, countryLocationAPI, cityLocationAPI);
    }
    catch (error) {
        console.log("Error Catched")
        errorMsg.textContent = `${error} --- Il faut peut être autoriser la localisation de votre appareil`;
        loader.style.display = "none";
    }
}

function addWeatherInfos(weatherLogo, temperature, country, city){

    weatherSVG.setAttribute("src", "./ressources/" + weatherLogo + ".svg")
    currentTemperature.textContent = temperature + "°";
    countryLocation.textContent = country;
    cityLocation.textContent = city;
    loader.style.display = "none";
}