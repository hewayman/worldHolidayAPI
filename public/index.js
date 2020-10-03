const baseURL = 'https://calendarific.com/api/v2/';
const key = '739ab79f6b9e8ec168e61e9c4412705c2c335bb0';
let url;
let holidayURL;

// SEARCH FORM
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

let country = '';
let countryAbbrevation = '';

// ADD EVENT LISTENERS  
searchForm.addEventListener('submit', getResults);

// RESULTS DIV
const results = document.querySelector('.results');
// const wrapper = document.querySelector('.wrapper');

function getResults(e) {
    e.preventDefault();
    url = baseURL + 'countries' + '?&api_key=' + key;
    console.log('URL', url);

    fetch(url)
      .then(res => res.json())
      .then(json => getCountry(json));

}

function getCountry(json) {
  console.log(json);

  for (let i = 0; i < json.response.countries.length; i++) {
    // let countryList = json.response.countries[i];
    let countryName = json.response.countries[i].country_name;
    let countryAbbr = json.response.countries[i]["iso-3166"];

    // console.log(countryList);
    // console.log(countryAbbr);

    if (searchTerm.value.toUpperCase() == countryName.toUpperCase() || searchTerm.value.toUpperCase() == countryAbbr) {
      country = countryName;
      countryAbbrevation = json.response.countries[i]["iso-3166"];
    }
  }

  console.log(country);
  console.log(countryAbbrevation);

  holidayURL = baseURL + 'holidays?&api_key=' + key + '&country=' + countryAbbrevation + '&year=2020';
  console.log('holiday url ' + holidayURL);

  fetch(holidayURL)
      .then(res => res.json())
      .then(json => displayResults(json));
  
}

function displayResults(json) {
  let numHoliday = json.response.holidays.length;
  let randomNum = Math.floor(Math.random() * numHoliday);
  let monthNames = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  let randomHoliday = json.response.holidays[randomNum].name;
  let description = json.response.holidays[randomNum].description;
  let month = json.response.holidays[randomNum].date.datetime.month;
  let day = json.response.holidays[randomNum].date.datetime.day;
  let year = json.response.holidays[randomNum].date.datetime.year;
  let date = '';

  // Get the month from the monthNames array and create a date string
  month = monthNames[(month - 1)];
  date = `${month} ${day}, ${year}`;

    // Remove children from results div before adding new search results
    while (results.firstChild) {
      results.removeChild(results.firstChild);
  }

  // Create elements
  // let heading = document.createElement('h2');
  // let dateHeading = document.createElement('h3')
  // let descriptionContent = document.createElement('p');
  // let detailsContainer = document.createElement('div');

  let heading = document.createElement('h5');
  let dateHeading = document.createElement('h6');
  let descriptionContent = document.createElement('p');
  let detailsContainer = document.createElement('div');
  let card = document.createElement('div');

  // // Create a class for the holiday details
  // detailsContainer.setAttribute('class', 'details');
  // detailsContainer.className = 'modal-dialog';
  heading.className = 'card-title';
  dateHeading.className = 'card-subtitle';
  descriptionContent.className = 'card-text';
  detailsContainer.className = 'card-body';
  card.className = 'card';
  card.style = 'width: 18rem';

  // // Set content for each element
  heading.textContent = randomHoliday;
  dateHeading.textContent = date;
  descriptionContent.textContent = description;

  // // Append children to the details container
  detailsContainer.appendChild(heading);
  detailsContainer.appendChild(dateHeading);
  detailsContainer.appendChild(descriptionContent);

  card.appendChild(detailsContainer);

  // // Append holiday details to the results div
  results.appendChild(card);
}
