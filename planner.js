// Get current day
let displayCurrentDay = moment().format("MMMM Do YYYY");
console.log(displayCurrentDay);

// Get present hour
let presentHour = moment().format("ha");
console.log(presentHour);

// Create hours array
const businessHours = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];

// Initiate function on page load
$(function () {
  createBlocks();
  $("#currentDay").text(displayCurrentDay);
  getEvents();
});

// Create time blocks looping through businessHours array - refactored for JQUERY each method
function createBlocks() {
  $(businessHours).each(function () {
    $("<div>", { class: "row time-block" })
      .append(
        $("<div>", { class: "col-1 hour" }).text(this).append(),
        $("<textarea>", { class: "col-10 description" })
          .attr("id", this)
          .append(),
        $("<button>", { class: "col-1 saveBtn" }).append(
          $("<i>", { class: "far fa-save" })
        )
      )
      .appendTo(".container");
  });

  // Set time block colours based on present hour and business hour conditional statements
  $("textarea").each(function () {
    // const hourStatus = this.id;
    if (this.id < presentHour) {
      $(this).addClass("past");
    } else if (this.id === presentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

// create array to hold user event objects
let eventsArray = [];

// Set event listener on all button clicks, get text value and id, and call sendEvents function
$(function () {
  $(".saveBtn").on("click", function (event) {
    // console.log("clicked");
    event.preventDefault(); 
    let userHour = $(this).siblings("textarea").attr("id");
    let userEvent = $(this).siblings("textarea").val();

   // localStorage.setItem(userHour, userEvent);
    // add item to object
    let calendarEvent = {
       hour: userHour,
       event: userEvent,
  };
  // add object to array
    eventsArray.push(calendarEvent);
  // call sendEvents to local storage function
    sendEvents();
});
});


// Store user event to local storage
function sendEvents(){
  localStorage.setItem("events", JSON.stringify(eventsArray));
}

// Get user event from local storage
function getEvents(){
  let retrievedArray = JSON.parse(localStorage.getItem("events"));
  console.log(retrievedArray);
  $(retrievedArray).each(function(){
    $("textarea#"+this.hour).val(this.event);
  })
}