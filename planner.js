// Get current day
let displayCurrentDay = moment().format("MMMM Do YYYY");
//console.log(displayCurrentDay);

// Get present hour using hour that matches the businessHours format
// Update: parsed to integer so can use math operators for conditional statements 
let presentHour = moment().format("HH");
console.log(presentHour);
let parsedhour = parseInt(presentHour);
console.log(parsedhour);

// Create hours array to be used as dynamic ids
// Update: changed to integer so can use math operators for conditional statements 
const businessHours = [
  09,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
];

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
          $("<i>", { class: "far fa-save fa-2x" })
        )
      )
      .appendTo(".container");
  });

  // Set time block colours based on present hour and business hour conditional statements
  $("textarea").each(function () {
    if (this.id < parsedhour) {
      $(this).addClass("past");
    } else if (this.id == parsedhour) {
      $(this).addClass("present");
    } else if (this.id > parsedhour) {
      $(this).addClass("future");
    }
  });
}

// create array to hold user event objects
let eventsArray = [];

// Get user event from local storage
function getEvents() {
  let retrievedArray = JSON.parse(localStorage.getItem("events"));
 // console.log(retrievedArray);
 if (retrievedArray !== null) eventsArray = retrievedArray;
  $(retrievedArray).each(function () {
    $("textarea#" + this.hour).val(this.event);
  });
}

// Store user event to local storage
function sendEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArray));

}

// Set event listener on all button clicks, get text value and id, and call sendEvents function
$(function () {
  createBlocks();
  $("#currentDay").text(displayCurrentDay);
  getEvents();
  $(".saveBtn").on("click", function () {
    // console.log("clicked");
   // event.preventDefault();
    let userHour = $(this).siblings("textarea").attr("id");
    let userEvent = $(this).siblings("textarea").val();

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
