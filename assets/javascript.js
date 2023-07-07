var repoContainer = document.querySelector('#card-holder');
var serachHistory = document.querySelector('#search-history');
var searchButton = document.getElementById('search-button');
var searchTerm = document.querySelector('#city-search');

function getApi(searched) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+searched+'&appid=9073fe83698dec072865ca84882e2778';
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayWeather(data);
      return data;
      }
)};

let cityArr = JSON.parse(localStorage.getItem("cities")) || [];

var formSubmitHandler = function (event) {
    event.preventDefault();
    var citySearch = searchTerm.value.trim();
    if (citySearch) {
      getApi(citySearch);
      cityArr.push(citySearch);
      window.localStorage.setItem("cities", JSON.stringify(cityArr));
      var citybutton = document.createElement("button");
      citybutton.setAttribute("type","button");
      citybutton.classList = "btn btn-dark";
      citybutton.textContent = citySearch;
      serachHistory.appendChild(citybutton);
    } else {
      alert('Please enter an ingredient to search with');
    }
};

function preSearched(name) {
    getApi(name);
}

function appendSearch() {
    //<button type="button" class="btn btn-dark">Dark</button>
    for (var y = 0; y<cityArr.length; y++) {
    var citybutton = document.createElement("button");
    citybutton.setAttribute("type","button");
    citybutton.classList = "btn btn-dark";
    citybutton.textContent = cityArr[y];
    serachHistory.appendChild(citybutton);
    }
}

function displayWeather(weather) {
    var todayWeather = document.createElement("div");
    todayWeather.classList = "container container-border";
    repoContainer.appendChild(todayWeather);

    var cityName = document.createElement("h1");
    cityName.textContent = searchTerm.value.trim();
    todayWeather.appendChild(cityName);

    var weatherinfo = document.createElement("p");
    weatherinfo.textContent = "info weather here";
    todayWeather.appendChild(weatherinfo);
    //put in for loop for five days
    //3, 11, 19, 27, 35
    var counter = 3;
    for (var i = 0; i<5; i++) {
    var weatherCard = document.createElement("div");
    weatherCard.classList = "card display-inline";
    weatherCard.setAttribute("style","width: 18rem");
    repoContainer.appendChild(weatherCard);

    var image = document.createElement("img");
    image.classList = "card-img-top";
    weatherCard.appendChild(image);

    var cardBody = document.createElement("div");
    cardBody.classList = "card-body";
    weatherCard.appendChild(cardBody);

    var title = document.createElement("h5");
    title.classList = "card-title";
    title.textContent = weather.list[counter].dt_txt;
    cardBody.appendChild(title);

    var cardInfo = document.createElement("p");
    cardInfo.classList = "card-text";
    cardInfo.textContent = "Temp: "+weather.list[counter].main.temp+"\n"+"Wind: "+weather.list[counter].wind.speed+" MPH \n"+"Humidity: "+weather.list[counter].main.humidity+"%";
    cardBody.appendChild(cardInfo);

    counter+=8;
    }
};

searchButton.addEventListener('click', formSubmitHandler);
appendSearch();