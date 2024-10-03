document.getElementById('searchBtn').addEventListener('click', getWeather);

document.getElementById('city').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        getWeather(); 
    }
});

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'f2d856b5acd74d4ebbf135534242609';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        
        if (data.error) {
            alert(data.error.message);
            return;
        }

      
        document.getElementById('weather-info').style.display = 'block';
        document.getElementById('city-name').textContent = `City : ${data.location.name}, ${data.location.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C (${data.current.temp_f}°F)`;
        document.getElementById('condition').textContent = `Condition: ${data.current.condition.text}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
        document.getElementById('wind').textContent = `Wind: ${data.current.wind_kph} kph (${data.current.wind_mph} mph)`;

 
     const conditionText = data.current.condition.text.toLowerCase();
     const weatherIcon = document.getElementById('weather-icon');
     
     
     if (conditionText.includes('sun') || conditionText.includes('clear')) {
         weatherIcon.src = 'sun.png'; 
     } else if (conditionText.includes('thunder') || conditionText.includes('lightning')) {
        weatherIcon.style.backgroundImage = 'light.png'; 
     }  else if (conditionText.includes('fog')) {
        weatherIcon.src = 'fog.png'; 
     }  else if (conditionText.includes('rain')) {
         weatherIcon.src = 'rain.png'; 
     } else if (conditionText.includes('overcast')) {
        weatherIcon.src = 'cloudy.png';
     } else if (conditionText.includes('snow')) {
         weatherIcon.src = 'snow.png'; 
     } else if (conditionText.includes('cloud')) {
         weatherIcon.src = 'cloudy.png'; 
     } else if (conditionText.includes('mist')) {
            weatherIcon.src = 'mist.png';
     } else {
         weatherIcon.style.display = 'none'; 
         return;
     }

    
     weatherIcon.style.display = 'block';

 } catch (error) {
     console.error('Error fetching the weather data:', error);
     alert('Could not retrieve weather information. Please try again.');
 }
}