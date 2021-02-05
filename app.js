const api = {
    key:"6e1767235c612277df7442a615e6342d",
    url:"http://api.openweathermap.org/data/2.5/weather?q="
}


let defaultCity = 'toronto';
getResults(defaultCity);


let searchBox = document.querySelector('#searchBox');
searchBox.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        getResults(searchBox.value);
    }
});


function getResults (query) {
    fetch(`${api.url}${query}&appid=${api.key}&units=metric`)
    .then(weather => {return weather.json()})
    .then(displayResults);
}


function displayResults (weather) {

    let city = document.querySelector('.city');
    city.innerHTML = weather.name + ", " + weather.sys.country;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}°C`

    let description = document.querySelector('.description');
    description.innerHTML = weather.weather[0].description;


    let temp_min_max = document.querySelector('.temp-min-max');
    temp_min_max.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

}


const dateBuilder = (now) => {

    let months = ['January',' February ','March','April ','May',' June ',' July ',' August',' September','October ','November',' December ']

    let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let date = now.getDate();

    return `${day}, ${month} ${date}`;
}