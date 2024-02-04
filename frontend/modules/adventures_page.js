
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  /*const query = search
  let path = query.split("=")
  return path[1];*/
  const query = new URLSearchParams(search);
 // console.log(query.get('city'))
  return query.get('city');

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
  
  if(row.children){
    row.innerHTML="";
  }

  // iterate through the adventures
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


    let textDiv = document.createElement("div");
    textDiv.setAttribute('class', "info")

    textDiv.innerHTML = `
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

    textDiv.innerHTML += `
    <ul>
     <li>Duration</li>
     <li>${obj.duration} Hours</li>
    </ul
    `
    div.append(banner, img, textDiv);

    link.append(div);
    col.append(link);
    row.append(col);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter((obj) => {
    let durationProp = Number(obj.duration);
    if (durationProp >= low && durationProp <= high) {
      //console.log(durationProp)
      return obj;
    }
  })
  //console.log(list);
  return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log(categoryList)
  list = list.filter((adventure) => {
    for (let i of categoryList) {
      //console.log(adventure.category +" "+i)
      if (adventure.category == i) {
        //console.log(adventure)
        return adventure;
      }
    }
  })
  //console.log(list)
  return list;
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
  //console.log(filters["duration"] + " vhj" + filters["category"].length);
  //case1 -filter by duration
  if (filters["duration"] && filters["category"].length == 0) {
    console.log("case1")
    let splitDuration = filters["duration"].split(" ");
    splitDuration = splitDuration[0].split("-");
    //console.log(splitDuration);
    let low = Number(splitDuration[0]);
    let high = Number(splitDuration[1]);
    list = filterByDuration(list, low, high);
    return list;
  }
  // case2 -filter by categeory
  //
  if (filters["category"].length > 0 && !filters["duration"]) {
    console.log("case2")
    list = filterByCategory(list, filters["category"]);
    return list;
  }
  //case3 - filter by both duration and category
  if (filters["category"].length > 0 && filters["duration"]) {
    console.log("case3")
    let splitDuration = filters["duration"].split(" ");
    splitDuration = splitDuration[0].split("-");
   
    let low = Number(splitDuration[0]);
    let high = Number(splitDuration[1]);
    list = filterByDuration(list, low, high);
 
    //console.log(list);

    list = filterByCategory(list, filters["category"]);

    //console.log(list);
    return list;
  }
  // Place holder for functionality to work in the Stubs
  //console.log(list)
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filterStorage = JSON.parse( localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filterStorage;
}


//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let list = document.querySelector("#category-list");
  //console.log("Invoked")
  let categoryList = filters["category"];
  /*
   let filterBy = document.createElement("span");
   filterBy.innerText="Filtered by:"
   filterBy.style = "font-weight:bold;font-size:15px"

   list.append(filterBy)
    if(list.children){
      list.innerHTML=""
    }
   */

  //console.log(filters)
  categoryList.forEach((filt) => {
    list.innerHTML += `<span class="badge "><button name=${filt} onclick="clearPill(event)">${filt} &#x2715;</button></span>`
  })

}
// Implemetation of DOM manipulation when clears the categories badge


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
