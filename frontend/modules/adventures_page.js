
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const query = search
  let path = query.split("=")
  return path[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  //let city = getCityFromURL(location.search)
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
    return response.json();
  }
  catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //const city = getCityFromURL(location.search);
  //adventures = fetchAdventures(city);
  let row = document.querySelector(".row");

  // iterate through the adventures
  console.log(Array.isArray(adventures))
  adventures.forEach(obj => {
    //console.log(obj)
    let col = document.createElement("div");
    col.setAttribute('class', "col-6 col-lg-3 mb-4")
   

    //link
    let link = document.createElement("a");
    link.setAttribute("href", `detail/?adventure=${obj.id}`);
    link.setAttribute("id", `${obj.id}`)

    //div  append to link 
    let banner = document.createElement("div");
    banner.setAttribute("class", "category-banner")
    banner.innerText = `${obj.category}`;

    //append image datils divs
    let div = document.createElement("div");
    div.setAttribute("class", "activity-card")

    let img = document.createElement("img");
    img.setAttribute("src", `${obj.image}`)

    //text div
    let text = document.createElement("div");
    //text.setAttribute("class", "adventure-detail-card")

    let textDiv = document.createElement("div");
    textDiv.setAttribute('class', "info")
    
    textDiv.innerHTML=`
    <ul>
     <li>${obj.name}</li>
     <li><span>&#8377;${obj.costPerHead}</span></li>
    </ul
    `
   /*
    //detail div
    let name = document.createElement("p");
    name.innerText = `${obj.name}`;
    let price = document.createElement("p")
    price.innerHTML= `<span>&#8377;${obj.costPerHead}</span>`
    textDiv.append(name, price);
*/

    let textDiv1 = document.createElement("div");
    textDiv1.setAttribute('class', "info")
    
    textDiv1.innerHTML=`
    <ul>
     <li>Duration</li>
     <li>${obj.duration} Hours</li>
    </ul
    `/*
    let duration = document.createElement("p");
    duration.innerText = `Duration`;
    let time = document.createElement("p")
    time.innerText = `${obj.duration} Hours`;
    textDiv1.append(duration, time);
    */
   text.append(textDiv, textDiv1)
    //append image and detail to activity card div
    div.append(banner,img, text);

    link.append(div);
    col.append(link);
    console.log(col)
    row.append(col);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
