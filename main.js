document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    getWeather();
});

async function getWeather() {
    const apiKey = 'f822b917c0284384ad4120917231711'; 
    const city = document.querySelector('.search').value;
    const weatherInfo1 = document.querySelector('.weather-part');
    const weatherInfo = document.querySelector('.weather-list');
    const weatherInfo3 = document.querySelector('.weather-part1');

    if (!city) {
        alert('You have to enter a city name!');
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            weatherInfo1.style.display = 'none';
            weatherInfo.style.display = 'flex';
            weatherInfo3.style.display = 'none';

            document.getElementById('list1').innerHTML = `
                <h5>${data.location.name}, ${data.location.country}</h5>
                <p>${new Date(data.location.localtime).toDateString()}</p>
                <p>${new Date(data.location.localtime).toLocaleTimeString()}</p>
            `;

            document.getElementById('list2').innerHTML = `
                <span class="blok2_sun">
                    <img class="img_sun" src="https:${data.current.condition.icon}" alt="weather icon">
                    <span class="num">${data.current.temp_c}°C</span>
                </span>
                <p class="sun-text">${data.current.condition.text}</p>
            `;

            document.getElementById('list3').innerHTML = `
                <p>Feels like: ${data.current.feelslike_c}°C</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind: ${data.current.wind_kph} kph</p>
            `;
        } else {
            weatherInfo1.style.display = 'none';
            weatherInfo.style.display = 'none';
            weatherInfo3.style.display = 'block';

            document.querySelector('.weather-part1 h2').textContent = `Error: ${data.error.message}`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

