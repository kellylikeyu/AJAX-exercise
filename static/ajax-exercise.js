'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch("/fortune")
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector('#fortune-text').innerHTML = responseData;
    })
}


document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({'zipcode' : zipcode}).toString();
  const updateURL = `${url}?${queryString}`
  fetch(updateURL)
    .then((response) => response.json())
    .then((responseJson) => {
      document.querySelector('#weather-info').innerText = responseJson.forecast;
    })


  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const melonsInput = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(melonsInput),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((responseJson) => {
        if (responseJson.code === 'ERROR'){
          document.querySelector('#order-status').classList.add('order-error');
        } else {
          document.querySelector('#order-status').classList.remove('order-error');
        }
        // document.querySelector('#order-status').innerText = responseJson.code
        document.querySelector('#order-status').innerText = responseJson.msg
    })

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


function showDogPicture() {
  const dogUrl = 'https://dog.ceo/api/breeds/image/random'
  fetch(dogUrl)
  .then((response) => response.json())
  .then((responseData) => {
    document.querySelector('#dog-pic').setAttribute('src', responseData.message)
    //document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `'<img src="${responseData.message}"'`)
  })
}

  const button = document.querySelector('#get-dog-image');
  button.addEventListener('click', showDogPicture);