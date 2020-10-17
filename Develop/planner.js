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
  // buttonStatus();
});

// Create time blocks using array item length based on time of day - USING JQUERY EACH
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
  // Set time block colours based on present hour
  $("textarea").each(function () {
    const hourStatus = this.id;
    if (hourStatus < presentHour) {
      $(this).addClass("past");
    } else if (hourStatus === presentHour) {
      $(this).addClass("present");
    } else if (hourStatus > presentHour) {
      $(this).addClass("future");
    }
  });
}

// Get user event input on submit
// Store user event input to local storage
// Get user event input from local storage - load on refresh

// Set time block colours based on time of day - USING FOR LOOP



// Create block with for loop
/*
function createBlocks() {
  for (i = 0; i < businessHours.length; i++) {
    $("<div>", { class: "row time-block" })
      .append(
        $("<div>", { class: "col-1 hour" }).text(businessHours[i]).append(),
        $("<textarea>", { class: "col-10 description" }).attr("id", businessHours[i]).append(),
        $("<button>", { class: "col-1 saveBtn" }).append(
          $("<i>", { class: "far fa-save" })
        )
      )
      .appendTo(".container");
  }
}
*/
