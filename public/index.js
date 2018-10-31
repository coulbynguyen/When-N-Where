// show modal on add click
function showAddEventModal(){
  var showAddEventModal = document.getElementById('add-event-modal');

  showAddEventModal.classList.remove('hidden');
}

var addEventButton = document.getElementById('addEvent');
addEventButton.addEventListener('click', showAddEventModal);



// hide modal on exit click

function hideEventModal(){
  var hideAddEventModal = document.getElementById('add-event-modal');
  hideAddEventModal.classList.add('hidden');
  clearSellSomethingModalInputs();
  // call clear fields
}

var closeEventButton = document.getElementById('modal-cancel');
closeEventButton.addEventListener('click', hideEventModal);

var xEventButton = document.getElementById('modal-close');
xEventButton.addEventListener('click', hideEventModal);


// Clear out modal fields
function clearSellSomethingModalInputs() {

  var postTextInputElements = [
    document.getElementById('event-name-input'),
    document.getElementById('event-photo-input'),
    document.getElementById('event-description-input'),
    document.getElementById('event-location-input')
  ];

  postTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });
  var timeInput = document.querySelector('input[type="time"]');
  timeInput.value = "00:00";

  var monthInput = document.querySelector('input[type="date"]');
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  var today = dd+'/'+mm+'/'+yyyy;
  var today = yyyy + '-' + mm + '-' + dd;
  monthInput.value = today;
}

//create post

var addEventButton = document.getElementById('modal-accept');
addEventButton.addEventListener('click', parseInfo);

//insert new post function

function insertNewPost(location, date, time, photoURL, description, title){

  var postRequest = new XMLHttpRequest();
  var postURL = "/addPost";
  postRequest.open('POST', postURL);

  var postArg = {
  location: location,
  date: date,
  time: time,
  photoURL: photoURL,
  description: description,
  title: title
};
var requestBody = JSON.stringify(postArg);
postRequest.setRequestHeader('Content-Type','application/json');

postRequest.addEventListener('load', function(event){
  if(event.target.status !== 200){
    alert("Error storing post in database:\n\n" + event.target.response);
  }
  
});
postRequest.send(requestBody);
  var postHTML = Handlebars.templates.post(postArg);
var postContainer = document.getElementById("posts")

postContainer.insertAdjacentHTML('beforeend', postHTML);


// var postHTML = Handlebars.templates.post(postArg);
//
// var postContainer = document.getElementById("posts")



}

//parse fields function

function parseInfo(){
  var location = document.getElementById('event-location-input').value.trim();
  var date = document.getElementById('event-date-input').value;
  var time = document.getElementById('event-time-input').value;
  var photoURL = document.getElementById('event-photo-input').value.trim();
  var description = document.getElementById('event-description-input').value.trim();
  var title = document.getElementById('event-name-input').value.trim();

  if (!description || !title || !photoURL || !time || !date || !location) {
    alert("You must fill in all of the fields!");
  }
  else {
    hideEventModal();
    console.log(location);
    console.log(date);
    console.log(time);
    console.log(photoURL);
    console.log(description);
    console.log(title);
    insertNewPost(location, date, time, photoURL, description, title);
  }
}
