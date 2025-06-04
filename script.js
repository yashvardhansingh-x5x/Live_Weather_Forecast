if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  alert("Geolocation is not supported by this browser.");
}

function successCallback(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  console.log("Latitude: " + lat+ ", Longitude: " + lon);
  updateMap(lat, lon);
  fetchWeather(lat, lon);
 
  // You can use the latitude and longitude here
}

function errorCallback(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;    
      case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
  }
}

try{
  const text = 'front-end developer..........!'; 
    const speed = 100;

    // Function to type text
    function typeText(elementId, text, speed, callback) {
      const element = document.getElementById(elementId);
      let index = 0;

      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        } else {
         
          setTimeout(callback, 1000); 
        }
      }

      type();
    }

    
    function deleteText(elementId, speed, callback) {
      const element = document.getElementById(elementId);
      let text = element.textContent;
      let index = text.length;

      function deleteChar() {
        if (index > 0) {
          element.textContent = text.substring(0, index - 1);
          index--;
          setTimeout(deleteChar, speed);
        } else {
         
          setTimeout(callback, 100);
        }
      }

      deleteChar();
    }

    // Function to run typing and deleting in a loop
    function typeAndDeleteLoop() {
      typeText('typing-text', text, speed, () => {
        deleteText('typing-text', speed, typeAndDeleteLoop);
      });
    }

    // Start the loop
    typeAndDeleteLoop();

}catch(err){
  console.log(err);

}

let dateContainer=document.querySelector(".dateContainer");


let hours=document.querySelector(".hours");
let min=document.querySelector(".min");
let sec=document.querySelector(".sec");
let AmPm=document.querySelector(".AmPm");



function updateTime(){
    let date=new Date();
    const onlyDate=date.toLocaleDateString();
    dateContainer.innerHTML=`${onlyDate}`;
    let hours1=date.getHours();
    let min1=date.getMinutes();
    let sec1=date.getSeconds();
    
   

    hours.innerText=`${hours1}`;
    min.innerText=`${min1}`;
    sec.innerText=`${sec1}`;

    if(hours1>=12){
        hours.innerHTML=`0${hours1-12}`;
        AmPm.innerText="PM";

    }
    else{
        AmPm.innerText="AM";
    }

    if(hours1<10){
        hours.innerHTML=`0${hours1}`;
    }

    if(min1<10){
        min.innerHTML=`0${min1}`;
    }
    if(sec1<10){
        sec.innerHTML=`0${sec1}`;
    }
   
    
}

setInterval(updateTime,1000);


 let searchBtn=document.querySelector("#searchBtn");
 let inputbox=document.querySelector("#inputbox");
 let sunrise=document.querySelector(".sunrise");
 let sunset=document.querySelector(".sunset");
 let citylocation=document.querySelector(".citylocation");
 let countrylocation=document.querySelector(".countrylocation");
 let description=document.querySelector(".description");
 let description1=document.querySelector(".description1");
 let temperature=document.querySelector(".temperature");
 let humidity=document.querySelector(".humidity");
 let wind=document.querySelector(".wind");
 let popdata=document.querySelector(".popdata");
 let weather_img=document.querySelector(".weather_img");
 let main=document.querySelector("main");

//  card4 data
 
 let timecard_4=document.querySelector(".timecard_4");
 let forecastpopcard_4=document.querySelector(".forecastpopcard_4");
 let forecasttempcard_4=document.querySelector(".forecasttempcard_4");
 let forecastwindcard_4=document.querySelector(".forecastwindcard_4");
 let weather_img1=document.querySelector(".weather_img1");

//  card5 data
let timecard_5=document.querySelector(".timecard_5");
let forecastpopcard_5=document.querySelector(".forecastpopcard_5");
let forecasttempcard_5=document.querySelector(".forecasttempcard_5");
let forecastwindcard_5=document.querySelector(".forecastwindcard_5");
let weather_img2=document.querySelector(".weather_img2");

//  card6 data
let timecard_6=document.querySelector(".timecard_6");
 let forecastpopcard_6=document.querySelector(".forecastpopcard_6");
 let forecasttempcard_6=document.querySelector(".forecasttempcard_6");
 let forecastwindcard_6=document.querySelector(".forecastwindcard_6");
 let weather_img3=document.querySelector(".weather_img3");

//  card7 data
let timecard_7=document.querySelector(".timecard_7");
let forecastpopcard_7=document.querySelector(".forecastpopcard_7");
let forecasttempcard_7=document.querySelector(".forecasttempcard_7");
let forecastwindcard_7=document.querySelector(".forecastwindcard_7");
let weather_img4=document.querySelector(".weather_img4");

//  card8
let timecard_8=document.querySelector(".timecard_8");
 let forecastpopcard_8=document.querySelector(".forecastpopcard_8");
 let forecasttempcard_8=document.querySelector(".forecasttempcard_8");
 let forecastwindcard_8=document.querySelector(".forecastwindcard_8");
 let weather_img5=document.querySelector(".weather_img5");
//  card9
let timecard_9=document.querySelector(".timecard_9");
let forecastpopcard_9=document.querySelector(".forecastpopcard_9");
let forecasttempcard_9=document.querySelector(".forecasttempcard_9");
let forecastwindcard_9=document.querySelector(".forecastwindcard_9");
let weather_img6=document.querySelector(".weather_img6");

//  card10
let timecard_10=document.querySelector(".timecard_10");
let forecastpopcard_10=document.querySelector(".forecastpopcard_10");
let forecasttempcard_10=document.querySelector(".forecasttempcard_10");
let forecastwindcard_10=document.querySelector(".forecastwindcard_10");
let weather_img7=document.querySelector(".weather_img7");
//  card11
let timecard_11=document.querySelector(".timecard_11");
let forecastpopcard_11=document.querySelector(".forecastpopcard_11");
let forecasttempcard_11=document.querySelector(".forecasttempcard_11");
let forecastwindcard_11=document.querySelector(".forecastwindcard_11");
let weather_img8=document.querySelector(".weather_img8");
 

var weather_data;
var lat;
var lon;
var city;
let response;


const map = L.map('map').setView([51.505, -0.09], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const apiKey = 'c28e2af0dd4fb13625582bbf721de5ccf'; 
const layer = 'precipitation_new'; 

let previousMarker;  // Declare a variable to store the previous marker

function updateMap(lat, lon) {
  map.setView([lat, lon], 6); 

  const precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: '&copy; <a href="https://openweathermap.org">OpenWeather</a>',
    maxZoom: 19,
    tileSize: 256,
    opacity: 1.0
  }).addTo(map);

  precipitationLayer.getContainer().style.filter = 'brightness(1) contrast(1.5) saturate(1.2)';

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      const nearestForecast = data.list[0]; 
      console.log("Next hour forecast:", nearestForecast);
      const temp = Math.round(nearestForecast.main.temp - 273.15);
      const weatherDesc = nearestForecast.weather[0].description;

      // Remove previous marker if it exists
      if (previousMarker) {
        map.removeLayer(previousMarker);  // Remove the old marker from the map
      }

      // Add a new marker with a popup
      previousMarker = L.marker([lat, lon]).addTo(map)
        .openPopup();
    })
    .catch(error => console.error("Error fetching forecast data:", error));
}

// Function to fetch latitude and longitude using OpenWeather API for a city
async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const weather_data = await fetch(url).then(response => response.json());
        if (weather_data.cod !== 200) {
            throw new Error(weather_data.message || "Failed to fetch weather data");
        }
        const lat = weather_data.coord.lat;
        const lon = weather_data.coord.lon;
        updateMap(lat, lon);
        fetchWeather(lat, lon);
          // Update map with the fetched lat and lon
    } catch (error) {
        main.innerHTML=`${error} &nbsp&nbsp Refresh the web again`;
        // alert(`Error: ${error.message}`);
    }
}

// Listen for button click to search city and update the map
document.getElementById('searchBtn').addEventListener('click', function() {
  const city = document.getElementById('inputbox').value.trim();

  if (city) {
    checkWeather(city);  // Fetch weather for the entered city
  } else {
    alert("Please enter a city name.");
  }
});

        

// Call the fetchWeather function with lat and lon
       
        
  
async function fetchWeather(lat, lon) {
  const api_key = "f9e2938b9061a8eeffde96229166b5af";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;

  try {
      const response = await fetch(url);
     let  weather_data1=await response.json();
      console.log(weather_data1);
    //   city=weather_data1.city.name;
      
      


      // Get the current time
      const currentTime = new Date();
      const formattedCurrentTime = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')} ${currentTime.getHours().toString().padStart(2, '0')}:00:00`;

      // Find the index of the nearest forecast block
      let nearestForecastIndex = null;

      for (let i = 0; i < weather_data1.list.length; i++) {
          const forecastTime = weather_data1.list[i].dt_txt;
          if (forecastTime >= formattedCurrentTime) {
              nearestForecastIndex = i;
              break;
          }
      }

      if(!weather_data1.status=="OK"){
        citylocation.textContent=`${weather_data1.message}`;
        countrylocation.textContent=``;
        sunrise.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        sunset.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        description.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        description1.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        temperature.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        humidity.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        wind.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        popdata.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_4.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_5.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_6.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_7.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_8.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_9.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_10.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        forecastpopcard_11.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
       }else{
        temperature.textContent=`${Math.round((weather_data1.list[nearestForecastIndex].main.temp)-273.15)}C`;
        description1.innerHTML=`${weather_data1.list[nearestForecastIndex].weather[0].main}`;

       humidity.innerHTML=`${weather_data1.list[nearestForecastIndex].main.humidity}%`;
       wind.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex].wind.speed))}<h6 style="display:inline;">kph</h6>`;
       switch(weather_data1.list[nearestForecastIndex].weather[0].main) {
        case 'Clouds':
            weather_img.src = "images/cloud.jpg";
            break;
        case 'Drizzle':
            weather_img.src = "images/drizzle.gif";
            break;  
        case 'Thunderstorm':
            weather_img.src = "images/thunder.gif";
            break;      
        case 'Clear':
            weather_img.src = "images/clear.jpg";
            break;
        case 'Mist':
            weather_img.src = "images/mist.jpg";
            break;    
        case 'Rain':
            weather_img.src = "images/rain.gif";
            break;
        case 'Haze':
            weather_img.src = "images/haze.gif";
            break;
        case 'Snow':
            weather_img.src = "images/snow.gif";
            break;
        case 'Smoke':
            weather_img.src = "images/smoke.jpg";
            break;
        default:
            weather_img.src="images/default.jpg";
    }
  
    
    
  
  
  
           
      
      
  


      const unixTimestamp = weather_data1.city.sunrise;
  
      // Convert Unix timestamp to milliseconds
      const date = new Date(unixTimestamp * 1000);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} AM`;

      
      
      // Output local time in hours and minutes
      sunrise.innerHTML=("Local time (HH:MM):", formattedTime);
  
  
      const unixTimestamp1 = weather_data1.city.sunset;
  
     
      const date1 = new Date(unixTimestamp1 * 1000);
      
      
      const hours1 = date1.getHours();
      const minutes1 = date1.getMinutes();

      
      
      
      const formattedTime1 = `${hours1>12?hours1-12:hours1}:${minutes1 < 10 ? '0' : ''}${minutes1} PM`;
      
      // Output local time in hours and minutes
      sunset.innerHTML=("Local time (HH:MM):", formattedTime1);
  
      
     
     
  
       }  


      if (nearestForecastIndex !== null) {

        //


         citylocation.textContent=`${weather_data1.city.name},`;
         countrylocation.textContent=weather_data1.city.country;
        
         description.innerHTML=`${weather_data1.list[nearestForecastIndex].weather[0].description} at ${weather_data1.list[nearestForecastIndex].dt_txt.slice(11, 16)}`;
         
        //
        
          popdata.innerHTML=`${Math.round(100*(weather_data1.list[nearestForecastIndex].pop))}%`;

          // Update card 4
          let timedata_4=weather_data1.list[nearestForecastIndex].dt_txt.slice(11, 13);

          if(timedata_4>12){
            timecard_4.innerHTML=`${timedata_4-12}PM`;
          }
          else if(timedata_4==12){
             timecard_4.innerHTML=`${timedata_4}PM`
          }
          else{
            timecard_4.innerHTML=`${timedata_4}AM`;
          }
         
          forecastpopcard_4.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex].pop)}%`;
          forecasttempcard_4.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex].main.temp_min)-273.15)}C`;
          forecastwindcard_4.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex].weather[0].main) {
            case 'Clouds':
                weather_img1.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img1.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img1.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img1.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img1.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img1.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img1.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img1.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img1.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
           
               
        }

          // Update card 5
          let timedata_5=weather_data1.list[nearestForecastIndex+1].dt_txt.slice(11, 13);

          if(timedata_5>12){
            timecard_5.innerHTML=`${timedata_5-12}PM`;
          }
          else if(timedata_5==12){
             timecard_5.innerHTML=`${timedata_5}PM`
          }
          else{
            timecard_5.innerHTML=`${timedata_5}AM`;
          }
         
          forecastpopcard_5.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+1].pop)}%`;
          forecasttempcard_5.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+1].main.temp_min)-273.15)}C`;
          forecastwindcard_5.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+1].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+1].weather[0].main) {
            case 'Clouds':
                weather_img2.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img2.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img2.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img2.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img2.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img2.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img2.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img2.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img2.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }

          // Update card 6
          let timedata_6=weather_data1.list[nearestForecastIndex+2].dt_txt.slice(11, 13);

          if(timedata_6>12){
            timecard_6.innerHTML=`${timedata_6-12}PM`;
          }
          else if(timedata_6==12){
             timecard_6.innerHTML=`${timedata_6}PM`
          }

          else{
            timecard_6.innerHTML=`${timedata_6}AM`;
          }
          forecastpopcard_6.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+2].pop)}%`;
          forecasttempcard_6.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+2].main.temp_min)-273.15)}C`;
          forecastwindcard_6.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+2].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+2].weather[0].main) {
            case 'Clouds':
                weather_img3.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img3.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img3.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img3.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img3.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img3.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img3.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img3.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img3.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }
          // Update card 7
          let timedata_7=weather_data1.list[nearestForecastIndex+3].dt_txt.slice(11, 13);

          if(timedata_7>12){
            timecard_7.innerHTML=`${timedata_7-12}PM`;
          }
          else if(timedata_7==12){
             timecard_7.innerHTML=`${timedata_7}PM`
          }
          else{
            timecard_7.innerHTML=`${timedata_7}AM`;
          }
          forecastpopcard_7.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+3].pop)}%`;
          forecasttempcard_7.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+3].main.temp_min)-273.15)}C`;
          forecastwindcard_7.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+3].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+3].weather[0].main) {
            case 'Clouds':
                weather_img4.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img4.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img4.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img4.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img4.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img4.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img4.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img4.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img4.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }

          // Update card 8
         let timedata_8=weather_data1.list[nearestForecastIndex+4].dt_txt.slice(11, 13);

          if(timedata_8>12){
            timecard_8.innerHTML=`${timedata_8-12}PM`;
          }
          else if(timedata_8==12){
             timecard_8.innerHTML=`${timedata_8}PM`
          }
          else{
            timecard_8.innerHTML=`${timedata_8}AM`;
          }
          forecastpopcard_8.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+4].pop)}%`;
          forecasttempcard_8.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+4].main.temp_min)-273.15)}C`;
          forecastwindcard_8.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+4].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+4].weather[0].main) {
            case 'Clouds':
                weather_img5.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img5.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img5.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img5.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img5.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img5.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img5.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img5.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img5.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }
          // Update card 9
        let timedata_9=weather_data1.list[nearestForecastIndex+5].dt_txt.slice(11, 13);

          if(timedata_9>12){
            timecard_9.innerHTML=`${timedata_9-12} PM`;
          }
          else if(timedata_9==12){
             timecard_9.innerHTML=`${timedata_9}PM`
          }
          else{
            timecard_9.innerHTML=`${timedata_9}AM`;
          }
          forecastpopcard_9.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+5].pop)}%`;
          forecasttempcard_9.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+5].main.temp_min)-273.15)}C`;
          forecastwindcard_9.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+5].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+5].weather[0].main) {
            case 'Clouds':
                weather_img6.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img6.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img6.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img6.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img6.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img6.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img6.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img6.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img6.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }

          // Update card 10
        let timedata_10=weather_data1.list[nearestForecastIndex+6].dt_txt.slice(11, 13);

          if(timedata_10>12){
            timecard_10.innerHTML=`${timedata_10-12}PM`;
          }
          else if(timedata_10==12){
             timecard_10.innerHTML=`${timedata_10}PM`
          }
          else{
            timecard_10.innerHTML=`${timedata_10}AM`;
          }
          forecastpopcard_10.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+6].pop)}%`;
          forecasttempcard_10.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+6].main.temp_min)-273.15)}C`;
          forecastwindcard_10.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+6].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+6].weather[0].main) {
            case 'Clouds':
                weather_img7.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img7.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img7.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img7.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img7.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img7.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img7.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img7.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img7.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }

          // Update card 11
          let timedata_11=weather_data1.list[nearestForecastIndex+7].dt_txt.slice(11, 13);

    
          if(timedata_11>12){
             timecard_11.innerHTML=`${timedata_11-12}PM`
          }
          else if(timedata_11==12){
            timecard_11.innerHTML=`${timedata_11}PM`
          }
          else{
            timecard_11.innerHTML=`${timedata_11}AM`
          }
          
          forecastpopcard_11.innerHTML = `${Math.round(100 * weather_data1.list[nearestForecastIndex+7].pop)}%`;
          forecasttempcard_11.innerHTML=`${Math.round((weather_data1.list[nearestForecastIndex+7].main.temp_min)-273.15)}C`;
          forecastwindcard_11.innerHTML=`${Math.round(3.6*(weather_data1.list[nearestForecastIndex+7].wind.speed))}<h6>km/h</h6>`;
          switch(weather_data1.list[nearestForecastIndex+7].weather[0].main) {
            case 'Clouds':
                weather_img8.innerHTML =`<i class="fa-solid fa-cloud-sun"></i>`;
                break;
            case 'Drizzle':
                weather_img8.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
                break;  
            case 'Thunderstorm':
              weather_img8.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
                break;      
            case 'Clear':
                weather_img8.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                break;
            case 'Mist':
                weather_img8.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;    
            case 'Rain':
                weather_img8.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
                break;
            case 'Haze':
                weather_img8.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            case 'Snow':
                weather_img8.innerHTML= `<i class="fa-solid fa-snowflake"></i>`;
                break;
            case 'Smoke':
                weather_img8.innerHTML = `<i class="fa-solid fa-smog"></i>`;
                break;
            
               
        }

      } else {
          console.log("No forecast data found for the current time.");
      }

  } catch (error) {
      console.error("Error fetching forecast data:", error);
  }






}


searchBtn.addEventListener("click", () => checkWeather(inputbox.value));




































