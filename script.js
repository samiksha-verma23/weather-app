const apiKey = "a3f38f7eefcb7f13282c6107b7d063d4";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temp= document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(!response.ok){
        document.querySelector(".weather").style.display = "none";
        alert("City not found");
        return;
    }
    const data = await response.json();
    console.log(data);

    temp.innerHTML = Math.round(data.main.temp) + "°C";
    cityName.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/hr";   

    weatherIcon.className = "fa-solid weather-icon";

    if (data.weather[0].main == "Clouds") {
         weatherIcon.classList.add("fa-cloud");
    }
    else if (data.weather[0].main == "Clear") {
         weatherIcon.classList.add("fa-sun");
    }
    else if (data.weather[0].main == "Rain") {
          weatherIcon.classList.add("fa-cloud-rain");
    }
    else if (data.weather[0].main == "Drizzle") {
         weatherIcon.classList.add("fa-cloud-sun-rain");
    }
    else if (data.weather[0].main == "Mist") {
         weatherIcon.classList.add("fa-smog");
    }
     else if (data.weather[0].main == "Snow") {
         weatherIcon.classList.add("fa-snowflake");
    }

    weather.style.display = "block";
    
}

checkWeather("Delhi");
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
    }

});
