import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import file name and path for other js files

// Business Logic

function getGifs(gifSearch) {
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${gifSearch}&api_key=${process.env.API_KEY}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, gifSearch);
    } else {
      printError(this, response, gifSearch);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function displayGif(gifSearch) {
  document.getElementById("gifContainer").innerText = `this is your ${gifSearch}`;
}

function printError(request, apiResponse, gifSearch) {
  document.querySelector('#errorContainer').innerText = `There was an error accessing the gif data for ${gifSearch}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}
// good to remember .forEach 
function printElements(apiResponse) {
  const container = document.querySelector('#gifContainer');
  apiResponse.data.forEach((response) => {
    container.innerHTML += `<img src="${response.images.original.url}">`;
  });
}

function handleFormSubmission(event) {
  event.preventDefault();
  const gifSearch = document.querySelector('#keyword').value;
  document.querySelector('#keyword').value = null;
  getGifs(gifSearch);
  displayGif(gifSearch);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
