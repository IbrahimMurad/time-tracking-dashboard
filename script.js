const timeframeBtns = document.querySelectorAll(".timeframe-btn");
const activities = document.querySelector(".activities");
const activityInfo = document.querySelectorAll(".activity-info");


// lighten the background color of the activity card
// when hovered on the time element
activityInfo.forEach((info) => {
  info.querySelector(".time").addEventListener('mouseenter', () => {
    info.classList.add("hovered");
  });
  info.querySelector(".time").addEventListener("mouseleave", () => {
    info.classList.remove("hovered");
  });
});

const previousString = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

// returns a selector for the activity card based on the title
// using data-activity attribute
function activitySelector(title) {
  return `.activity-card[data-activity="${title
    .toLowerCase()
    .replace(" ", "-")}"]`;
}

// fill the activity cards with the data
async function fillData(data, timeframe) {

  // loop through the data and update the current and previous time
  // for each corresponding activity card selected by the title
  for (const activity of data) {
    const activityElement = activities.querySelector(
      activitySelector(activity.title)
    );

    // update the activity current time and its data attribute
    const current = activityElement.querySelector(".current");
    current.textContent = activity.timeframes[timeframe].current + "hrs";
    current.dataset.current = activity.timeframes[timeframe].current;

    // update the activity previous time and its data attribute
    const previous = activityElement.querySelector(".previous");
    previous.textContent =
      previousString[timeframe] +
      " - " +
      activity.timeframes[timeframe].previous +
      "hrs";
    previous.dataset.previous = activity.timeframes[timeframe].previous;
  }
}

// loop through the timeframe buttons and add an event listener
// to switch between timeframes [daily - weekly - monthly] when clicked
timeframeBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    timeframeBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    // store the current timeframe [daily - weekly - monthly] into a variable for readability
    const timeframe = btn.dataset.timeframe.toLowerCase();
    try {
      // get the data and 
      const response = await fetch("data.json");
      const data = await response.json();
      fillData(data, timeframe);
    } catch (error) {
      console.error(error);
    }
  });
});
