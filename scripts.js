const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const input = document.querySelector(".input");
const form = document.querySelector(".form");

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

const renderWeather = function (main, name, sys, weather, icon) {
  const html = `
   <li class="city">
  <div class="city-name">
    ${name}
    <sup>${sys.country}</sup>
  </div>
  <div class="city-temp">${main.temp.toFixed(0)}<sup>°C</sup></div>
    <img class="city-icon" src="${icon}" alt="" />
    <figcaption>${weather[0].description}</figcaption>
</li>
`;
  list.insertAdjacentHTML("beforeend", html);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;
  /* Your code: check list arrays */

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      /* Your code: process element */
      renderWeather(main, name, sys, weather, icon);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
