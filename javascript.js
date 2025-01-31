console.log("how are you");

const apiKey = "ULLZAVP98LHVZBLKNFM5PZGCM";
const img = document.querySelector(".weather-now img");

const graphicHandler = (function () {

    const nowWeather = (response) => {
        const city = document.querySelector(".city");
        const humidity = document.querySelector(".humidity");
        const temperature = document.querySelector(".temperature");
        
        city.innerHTML = response.address;
        humidity.innerHTML = response.description;
        temperature.innerHTML = response.currentConditions.temp+"°";

        getPicture(response.currentConditions.icon, img);
    }

    const getPicture = (icon, img) => {
        if(icon == "fog" || icon == "cloudy" || icon == "partly-cloudy-day" || icon == "partly-cloudy-night"){
            img.src = "./images/cloudy.png";
        }else if(icon == "clear-day" || icon == "clear-night"){
            img.src = "./images/sun.png";
        }else if(icon == "wind"){
            img.src = "./images/wind.png";
        }else if(icon == "snow"){
            img.src = "./images/snow.png";
        }else{
            img.src = "./images/storm.png";
        }
    };

    const fillDays = (response) => {
        const date = new Date();
        const forcast = document.querySelector(".forcast");
        forcast.innerHTML = "";
        const nowHour = date.getHours();

        for(let i=0; i<5; i++){
            fillADay(response.days[0], nowHour+i);
        }

    };

    const fillADay = (conds, hour) => {
        const forcast = document.querySelector(".forcast");
        const hourText = document.createElement("p");
        const img = document.createElement("img");
        const temp = document.createElement("p");
        const dayContainer = document.createElement("div");
        dayContainer.classList.add("day");

        getPicture(conds.hours[hour].icon, img);
        temp.innerHTML = conds.hours[hour].temp+"°";
        hourText.innerHTML = conds.hours[hour].datetime;

        dayContainer.appendChild(hourText);
        dayContainer.appendChild(img);
        dayContainer.appendChild(temp);

        forcast.appendChild(dayContainer);
    };

    fillAirConditions = (response) => {
        const realFeel = document.querySelector(".real-feel+p");
        const humidity = document.querySelectorAll(".humidity+p");
        const wind = document.querySelector(".wind-speed+p");
        const index = document.querySelector(".uv-index+p");
        
        realFeel.innerHTML = response.currentConditions.feelslike+"°";
        humidity.innerHTML = response.currentConditions.humidity;
        wind.innerHTML = response.currentConditions.windspeed+" km/h";
        index.innerHTML = response.currentConditions.uvindex;    
    };

    return {
        getPicture,
        nowWeather,
        fillDays,
        fillAirConditions
    }

})();

let data;

function getData(location) {
    return fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${apiKey}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //console.log(response);
            return response;
        });
}

const btn = document.querySelector("button");
btn.addEventListener("click", async () => {
    const input = document.querySelector("input");
    
    getData("Bouira");
    const retriveData = await getData(input.value);
    graphicHandler.nowWeather(retriveData);
    graphicHandler.fillDays(retriveData);
    graphicHandler.fillAirConditions(retriveData);
    console.log("hak",retriveData.currentConditions.humidity);
});
