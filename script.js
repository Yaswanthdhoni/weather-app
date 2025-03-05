let weather = {
  apikey: "194d9553e5d9c79bdc1dd59953cad16c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°c";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity : " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed :" + speed + " km/hr";

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://google.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },
};

document.querySelector(".btn").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Mumbai");
