import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const URL = `${config.backendEndpoint}/reservations`
  try{
  const response = await fetch(URL);
  // convert into JSON data
  const data = await response.json();
  console.log(data, "reservation debug");
  // Place holder for functionality to work in the Stubs
  return data;
  }
  catch(error){
  
    return null;
  }
  
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  const noReservationBannerElement = document.getElementById("no-reservation-banner");
  const reservationTableParentElement = document.getElementById("reservation-table-parent");
  if(reservations.length >0){
    noReservationBannerElement.style.display = "none"
    reservationTableParentElement.style.display = "block";
  }
  else{
    noReservationBannerElement.style.display = "block"
    reservationTableParentElement.style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */



 reservations.forEach(reservation => {
  const date = new Date(reservation.date);
 
  const formatDate = date.toLocaleDateString('en-IN',{
   day: 'numeric',
   month: 'numeric',
   year: 'numeric',
  });


  const time = new Date(reservation.time);//time:"Mon Mar 11 2024 00:46:16 GMT+0530 (India Standard Time)"
 
  const day = time.getDate();
  const month = time.toLocaleString('en-IN', { month: 'long' });
  const year = time.getFullYear();  
  /*const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();*/
  const formattedTime =  time.toLocaleTimeString('en-IN', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

  const formattedDateTime = `${day} ${month} ${year}, ${formattedTime}`;
  const {id, name,adventure,adventureName, person, price, } = reservation;
  const reservationTable = document.getElementById("reservation-table");
  reservationTable.innerHTML +=`
  <tr>
  <td><b>${id}<b></td>
  <td>${name}</td>
  <td>${adventureName}</td>
  <td>${person}</td>s
  <td>${formatDate}</td>
  <td>${price}</td>
  <td>${formattedDateTime}</td>
  <td><button id=${id} class="reservation-visit-button"><a href ="../detail/?adventure=${adventure}">Visit Adventure</a></button></td>
  </tr>
  `
 });

}

export { fetchReservations, addReservationToTable };
