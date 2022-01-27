const bodys = document.body;
const btn = document.querySelector('.btn');
const cityName = document.querySelector('.city');
const tmp = document.querySelector('.temperature');
const weather = document.querySelector('.weather');
const hundity = document.querySelector('.hundity');
const cityInput = document.querySelector('.cityIn');
const find = document.querySelector('.find');
const warning = document.querySelector('.warning');
const vis = document.querySelector('.weathvis i');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=a60753823aee874ff75f46abdca97a6b';
const units = '&units=metric';

let url;
let city;

(cityName.textContent == '') ? city = 'Konin' : false;

btn.addEventListener('click', function(){
    cityInput.classList.toggle('show');
    btn.classList.toggle('move');
    find.classList.toggle('show');
});

find.addEventListener('click', function(){
    city = cityInput.value;

    cityInput.value = '';
    warning.textContent = '';
    cityInput.classList.toggle('show');
    btn.classList.toggle('move');
    find.classList.toggle('show');
    getWeather(city);
})

const getWeather = (city) => {

    url = apiLink + city + apiKey + units;

    axios.get(url)
    .then(res => {
        const temper = res.data.main.temp;
        const hundi = res.data.main.humidity;
        const weath = Object.assign({}, ...res.data.weather);
        const weatherID = weath.id

        cityName.textContent = res.data.name;
        tmp.textContent = Math.floor(temper) + '°C';
        hundity.textContent = hundi + '%';
        weather.textContent = weath.main;

        if(weatherID >= 200 && weatherID < 300){
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(197, 144, 221), rgb(10, 70, 161))';
            vis.outerHTML = '<i class="fas fa-poo-storm vis"></i>'
        }
        else if(weatherID >= 300 && weatherID < 500){
            photo.setAttribute('src', 'img/drizzle.png');
        }
        else if(weatherID >= 500 && weatherID < 600){
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(15, 32, 194), rgb(25, 141, 196))';
            vis.outerHTML = '<i class="fas fa-cloud-showers-heavy vis"></i>';
        }
        else if(weatherID >= 600 && weatherID < 700){
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(158, 250, 244), rgb(10, 113, 161))';
            vis.outerHTML = '<i class="fas fa-snowflake vis"></i>';
        }
        else if(weatherID >= 700 && weatherID < 800){
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(142, 192, 184), rgb(68, 122, 148))';
            vis.outerHTML = '<i class="fas fa-smog vis"></i>';
        }
        else if(weatherID == 800){
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(20, 213, 197), rgb(10, 113, 161))';
            vis.outerHTML = '<i class="fas fa-sun vis"></i>';
        }
        else if(weatherID >= 801 && weatherID < 900){
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(180, 187, 186), rgb(10, 113, 161))';
            vis.outerHTML = '<i class="fas fa-cloud vis"></i>'
        }
        else{
            bodys.style.backgroundImage = 'linear-gradient(to bottom right, rgb(180, 187, 186), rgb(10, 113, 161))';
        }
    })
    .catch(err => {warning.textContent = 'Nie ma takiego miasta ! '
    console.log(err)});
    
}
