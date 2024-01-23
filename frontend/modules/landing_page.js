import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities)
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch("http://3.110.210.213:8082/cities");
    let cities = await res.json();
    return cities;
  }
  catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let row = document.querySelector(".row");
  //row.setAttribute("id", id);
  let col = document.createElement("div");
  col.setAttribute('class', "col-sm-12 col-md-6 col-lg-3 mb-4");

  //link
  let link = document.createElement("a");
  link.setAttribute("href", `adventures/?city=${id}`);
  link.setAttribute('id',id)
  
  let tile = document.createElement("div");
  tile.setAttribute('class','tile')
  let tileText = document.createElement("div");
  tileText.setAttribute('class', 'tile-text');
  // inside text
  let h5 = document.createElement('h5');
  h5.innerText = city;

  let p = document.createElement('p');
  p.innerText = description;

  let img = document.createElement('img');
  img.setAttribute('src', image);
  img.setAttribute('class', 'img-fluid')

  tileText.append(h5,p);
  tile.append(tileText, img);

  // append tile div to col div
  link.append(tile);

  col.append(link);
  row.append(col);
}

export { init, fetchCities, addCityToDOM };
