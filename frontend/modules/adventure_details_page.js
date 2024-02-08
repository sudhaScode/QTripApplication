import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    let params = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    const data = await response.json();
    //console.log(data);
    return data;
  }
  catch (error){
    return null;
  } 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);
  let name = document.querySelector("#adventure-name");
  let subtitle = document.querySelector("#adventure-subtitle");
  let photosSection = document.getElementById("photo-gallery");
  let content = document.querySelector("#adventure-content");

  name.innerHTML = adventure.name;
  subtitle.innerHTML = adventure.subtitle;
  
  for(let i in adventure.images){
    let img =  document.createElement("img");
    img.setAttribute("src",adventure.images[i]);
    img.setAttribute("alt", "images");
    img.setAttribute("class", "activity-card-image")
    photosSection.append(img);
  }
  //console.log(document.getElementsByClassName("activity-card-image").length);
  
  content.innerText = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photosSection = document.getElementById("photo-gallery");

  // photo galary
  let carousel = document.createElement("div");
  carousel.setAttribute("id", "carouselExampleIndicators");
  carousel.setAttribute("class", "carousel slide");

  // buttons on carousel 
  let button = document.createElement("div");
  button.setAttribute("class", "carousel-indicators");

  // gallary sesction
  let carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner");
  for (let i in images){
    let carouselItem = document.createElement("div");
    let navButton = document.createElement("button");
    navButton.setAttribute("type", "button");
    navButton.setAttribute("data-bs-target","#carouselExampleIndicators");
    navButton.setAttribute("data-bs-slide-to",i);
    navButton.setAttribute("aria-label",`Slide ${i+1}`);
    if(i==0){
      carouselItem.setAttribute("class", "carousel-item active");
      navButton.setAttribute("class", "active");
      navButton.setAttribute("aria-current","true");
    }
    else{
      carouselItem.setAttribute("class", "carousel-item");
    }
    let img =  document.createElement("img");
    img.setAttribute("src", images[i]);
    img.setAttribute("class", "d-block w-100");
    img.setAttribute("class", "activity-card-image")
    img.setAttribute("alt", "images");
    carouselItem.append(img);  
    button.append(navButton);  
    carouselInner.append(carouselItem);
  }
  // append all sections
  carousel.append(button, carouselInner);
 
   // side-navigation
   carousel.innerHTML += `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Previous</span>
 </button>
 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Next</span>
 </button>`;
 photosSection.innerHTML="";
 photosSection.append(carousel);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
