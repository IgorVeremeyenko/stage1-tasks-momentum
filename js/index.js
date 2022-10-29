import playList from "../playList.js";

const time = document.querySelector('.time');
const dateTime = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const options = { month: 'long',day: 'numeric',year: 'numeric' };
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const cityName = document.querySelector('.city');
const quote = document.querySelector('.quote');
const authors = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const audio = new Audio();
const playBtn = document.querySelectorAll('.play');
const playNxt = document.querySelectorAll('.play-next');
const playPrv = document.querySelectorAll('.play-prev');
const playListContainer = document.querySelector('.play-list');
const li = document.createElement('li');
const swLangBtn = document.createElement('button');
const switchLang = document.querySelector('.lang');
const switchButton = document.querySelectorAll('.switch-btn');
const settings = document.querySelector('.settings');
const iconOfSettings = document.querySelector('.menu');
const select = document.getElementById('sources');
const image = new Image();
image.src = './assets/svg/settings.svg';
const icon = new Image();
icon.src =  './assets/svg/settings-icon.svg';
icon.classList.add('img-icon');
iconOfSettings.append(icon);

const state = {
    language: 'RU',
    photoSource: select.value,
    blocks: []
}

const blocks = {
    'tim' : time,
    'dat' : dateTime,
    'greet' : [
        greeting,
        name
    ],
    'quot' : [
        quote,
        authors,
        changeQuote
    ],
    'weat' : [
        weatherDescription,
        temperature,
        humidity,
        weatherIcon,
        wind
    ],
    'aud' : [
        playBtn,
        playNxt,
        playPrv,
        playListContainer
    ],
    names : {
        'tim' : 'time',
        'dat' : 'date',
        'greet' : 'greeting',
        'quot' : 'quote',
        'weat' : 'weather',
        'aud' : 'audio'
    },
    buttons : {
        'time' : 'tim',
        'date' : 'dat',
        'greeting' : 'greet',
        'quote' : 'quot',
        'weather' : 'weat',
        'audio' : 'aud'
    }
}

const setState = () => {
    const obj = blocks.buttons;
    for (const iterator in obj) {
        state.blocks.map(item => {
            if(item === iterator){
                switchButton.forEach(el => {
                    if(el.classList[1] === obj[iterator]){
                        el.classList.toggle('switch-on');
                        let flag = el.classList.contains('switch-on');
                        switchClass(obj[iterator], flag);
                    }
                })
            }
        })        
    }
}

const switchClass = (value, flag) => {
    const str = 'close-set';
    if(!flag) {
        if(value === 'aud'){
            blocks[value].map(item => {
                if(item === playListContainer){
                    playListContainer.classList.add(str);
                    return;
                }
                item.forEach(element => {
                    element.classList.add(str);
                })
        })
            let index = state.blocks.indexOf(blocks.names[value]);
            if(index === -1){
                state.blocks.push(blocks.names[value]);
            }
        }
        else {
            if(value === 'tim' || value === 'dat'){       
                blocks[value].classList.add(str);
                let index = state.blocks.indexOf(blocks.names[value]);
                if(index === -1){
                    state.blocks.push(blocks.names[value]);
                }
            }
            else {
                blocks[value].map(item => {
                    item.classList.add(str);
                    let index = state.blocks.indexOf(blocks.names[value]);
                    if(index === -1){
                        state.blocks.push(blocks.names[value]);
                    }
                })
            }
        }
    }
    else {
        if(value === 'aud'){
            blocks[value].map(item => {
                if(item === playListContainer){
                    playListContainer.classList.remove(str);
                    return;
                }
                item.forEach(element => {
                    element.classList.remove(str);
                })
        })
        let index = state.blocks.indexOf(blocks.names[value]);
        if(index != -1){
            state.blocks.splice(index, 1);
        }
        }
        else {
            if(value === 'tim' || value === 'dat'){
                blocks[value].classList.remove(str);
                let index = state.blocks.indexOf(blocks.names[value]);
                if(index != -1){
                    state.blocks.splice(index, 1);
                }
            }
            else {
                blocks[value].map(item => {
                    item.classList.remove(str);
                    let index = state.blocks.indexOf(blocks.names[value]);
                    if(index != -1){
                        state.blocks.splice(index, 1);
                    }
                })
            }            
        }        
    }
}

switchButton.forEach(el => {
    el.addEventListener('click', click => {
        el.classList.toggle('switch-on');
        const value = el.classList.contains('switch-on');              
        switchClass(el.classList[1], value);        
        setLocalStorage();
    })
})


document.addEventListener('click', cl => {
    if(cl.target.className === 'header' || cl.target.className === 'footer' || cl.target.className === 'main' || cl.target.className === 'description-container' || cl.target.className === 'city' ||
    cl.target.className === 'greeting' || cl.target.className === 'quote' || cl.target.className === 'wind' || cl.target.className === 'temperature'
    || cl.target.className === 'weather-icon owf owf-803' || cl.target.className === 'weather-lang-container' || cl.target.className === 'name'){
        settings.classList.add('close-set');        
    }
})

iconOfSettings.addEventListener('click', c => {
    if(settings.classList.contains('close-set'))
    settings.classList.remove('close-set');
    else settings.classList.add('close-set');
})

playListContainer.append(li);

playList.forEach(item => {
    li.textContent = item.title;
    li.classList.add('play-item');
})
let randomNum;
let isPlay = false;
let playNum = 0;
let lang = state.language;

select.addEventListener('change', option => {
    state.photoSource = option.target.value;    
    setLocalStorage();
    changePhotoSource();
})

let currentDate = date.toLocaleDateString(`${lang.toLowerCase()}-${lang}`,options);

const greetingTranslation = {
    "RU": {
        'morning': 'Доброе утро',
        'afternoon': 'Добрый день',
        'evening': 'Добрый вечер',
        'night': 'Доброй ночи',
        'windSpeed': 'м/с',
        'wind': 'Скорость ветра',
        'humidity': 'Влажность',
        'placeholder': 'Ваше имя'
    },
    "EN": {
        'morning': 'Good morning',
        'afternoon': 'Good afternoon',
        'evening': 'Good evening',
        'night': 'Good night',
        'windSpeed': 'm/s',
        'wind': 'Wind speed',
        'humidity': 'Humidity',
        'placeholder': 'Your name'
    }
}

const changePhotoSource = () => {
    console.log(state.photoSource)
    switch(state.photoSource){
        case 'Github' : setBg();
        break;
        case 'Unslash' : getLinkToImageFromUnslash();
        break;
        case 'Flick' : getLinkToImageFromFlick();
        break;
    }
}

image.classList.add('img-settings');
settings.append(image);
switchLang.append(swLangBtn);
swLangBtn.textContent = lang;
swLangBtn.classList.add('lang-button');

swLangBtn.addEventListener('click',click => {
    if(lang === 'EN') {
        lang = 'RU';
        state.language = lang;
        swLangBtn.textContent = lang;
        currentDate = date.toLocaleDateString(`${lang.toLowerCase()}-${lang}`,options);
        showDate();
        getQuotes();
        getWeather();
        getLocalStorage();
    }
    else {
        lang = 'EN';
        state.language = lang;
        swLangBtn.textContent = lang;
        currentDate = date.toLocaleDateString(`${lang.toLowerCase()}-${lang}`,options);
        showDate();
        getQuotes();
        getWeather();
        getLocalStorage();
    }
})

cityName.addEventListener('change',enter => {
    if(enter.target.value === '') cityName.value = 'Минск';
    setLocalStorage();
    getWeather();
})

changeQuote.addEventListener('click',textChange => {
    getQuotes();
})

function setLocalStorage() {
    localStorage.setItem('name',name.value);
    localStorage.setItem('cityName',cityName.value);
    localStorage.setItem('state', JSON.stringify(state));
}
window.addEventListener('beforeunload',setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    else {
        name.placeholder = greetingTranslation[lang].placeholder;
    }
    if(localStorage.getItem('cityName')) {
        cityName.value = localStorage.getItem('cityName');
        getWeather();
    }
    else {
        cityName.value = 'Минск'
    }
    if(localStorage.getItem('state')){
        const obj = JSON.parse(localStorage.getItem('state'));
        state.photoSource = obj.photoSource;
        state.blocks = obj.blocks;
        state.language = lang;
        select.value = state.photoSource;
        setState();
    }
}
window.addEventListener('load',getLocalStorage);

const getQuotes = async () => {
    const quotes = 'data.json';
    fetch(quotes)
        .then(res => res.json())
        .then(data => {
            data.map(item => {
                const size = item[lang].length;
                const rundomNumber = Math.floor(Math.random() * size);
                quote.textContent = item[lang][rundomNumber].text;
                authors.textContent = item[lang][rundomNumber].author
            })
        });
}

/*Audio player*/

const playAudio = () => {

    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if(!isPlay) {
        audio.play();
        isPlay = true;

    }
    else {
        audio.pause();
        isPlay = false;
    }
}

playBtn.forEach(element => {
    element.addEventListener('click',click => {
        playAudio();
        element.classList.toggle('pause');
    });
});


const playNext = () => {
    const count = playList.length - 1;
    if(playNum < count) playNum++;
    else playNum = 0;
}

playNxt.forEach(element => {
    element.addEventListener('click',playNext);
})

const playPrev = () => {
    const count = playList.length - 1;
    if(playNum > 0) playNum--;
    else playNum = 0;
}

playPrv.forEach(element => {
    element.addEventListener('click',playPrev);
})

/* */

async function getWeather() {
    weatherIcon.className = 'weather-icon owf';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&lang=${lang}&appid=599cb26395c436e3744755f147138dd6&units=metric`;
    const res = await fetch(url);
    const data = await res.json().catch(e => {
        weatherError.textContent = e;
    });

    if(data.name === 'Минск' || data.name === 'Minsk') cityName.value = data.name;

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${greetingTranslation[lang].wind} ${Math.trunc(data.wind.speed)} ${greetingTranslation[lang].windSpeed}`;
    humidity.textContent = `${greetingTranslation[lang].humidity} ${data.main.humidity}%`
}

const getRandomNum = () => {
    randomNum = Math.floor(Math.random() * (20 - 1) + 1);
}

const getLinkToImageFromUnslash = async () => {
    let timeOfDay = getTimeOfDay();
    const img = new Image();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature-${timeOfDay}&client_id=33phBnu-52qHySZi-iVinAJCZZ-tykXRxz1b7H3ODXY`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = `url('${img.src}')`;
    };
}

const getLinkToImageFromFlick = async () => {
    let timeOfDay = getTimeOfDay();    
    const img = new Image();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5470426865cb5f0d26086e9db78ae105&tags=nature-${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`
    const res = await fetch(url);
    const data = await res.json();
    const size = data.photos.photo.length;
    const randomNumber = Math.floor(Math.random() * size);
    img.src = data.photos.photo[randomNumber].url_h;
    img.onload = () => {
        body.style.backgroundImage = `url('${img.src}')`;
    };
}

const setBg = () => {
    let timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2,"0");
    const img = new Image();
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.src = url;
    img.onload = () => {
        body.style.backgroundImage = `url('${url}')`;
    };
}

const getSlideNext = () => {
    randomNum++;
    if(randomNum >= 20) randomNum = 1;
    randomNum.toString().padStart(2,"0");
    changePhotoSource();
    //setBg();
    // getLinkToImageFromUnslash();
    // getLinkToImageFromFlick();
}

slideNext.addEventListener('click',getSlideNext);

const getSlidePrev = () => {
    randomNum--;
    if(randomNum < 1) randomNum = 20;
    randomNum.toString().padStart(2,"0");
    changePhotoSource();
    // setBg();
    // getLinkToImageFromUnslash();
    // getLinkToImageFromFlick();
}

slidePrev.addEventListener('click',getSlidePrev);

const showDate = () => {
    dateTime.textContent = currentDate;
}

const getTimeOfDay = () => {

    let hoursMinutes = minutes / 100 + hours;

    if(hoursMinutes >= 0.0 && hoursMinutes <= 5.59) {
        return 'night';
    }
    if(hoursMinutes >= 6.0 && hoursMinutes <= 11.59) {
        return 'morning';
    }
    if(hoursMinutes >= 12.0 && hours <= 17.59) {
        return 'afternoon';
    }
    if(hoursMinutes >= 18.0 && hoursMinutes <= 23.59) {
        return 'evening';
    }
}

function showTime() {
    const dateTime = new Date();
    const currentTime = dateTime.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `${greetingTranslation[lang][timeOfDay]},`;
    setTimeout(showTime,1000);
}
showTime();
getRandomNum();
changePhotoSource();
// setBg();
// getLinkToImageFromUnslash();
// getLinkToImageFromFlick();
getQuotes();
