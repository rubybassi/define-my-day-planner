// Initiate function on page load
$(function(){
    createBlocks();
    let displayCurrentDay = moment().format('MMMM Do YYYY'); // Display current day
    $('#currentDay').text(displayCurrentDay);
})

// Create time blocks - used businessHours array for total blocks and hour
const businessHours = ["9am","10am","11am","12pm","1pm","2pm","3pm","4pm",
"5pm"];
function createBlocks() {
for(i=0; i<businessHours.length; i++){
    $("<div>", {class: "row time-block"}).append(
        $("<div>", {class: "col-1 hour"}).text(businessHours[i]).append(
        ), 
        $("<textarea>", {class: "col-10 description"}).append(
        ),
        $("<button>", {class: "col-1 saveBtn"}).append(
            $("<i>", {class: "far fa-save"})
        )
    ).appendTo(".container")
}};

// Set time block colours based on time of day
// Get user event input on submit
// Store user event input to local storage
// Get user event input from local storage - load on refresh  