const timeframeBtns = document.querySelectorAll(".timeframe-btn");
const activities = document.querySelector(".activities");

const previousString = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

function activitySelector(title) {
  return `.activity-card[data-activity="${title
    .toLowerCase()
    .replace(" ", "-")}"]`;
}

async function fillData(data, timeframe) {

  for (const activity of data) {
    const activityElement = activities.querySelector(
      activitySelector(activity.title)
    );

    const current = activityElement.querySelector(".current");
    current.textContent = activity.timeframes[timeframe].current + "hrs";
    current.dataset.current = activity.timeframes[timeframe].current;

    const previous = activityElement.querySelector(".previous");
    previous.textContent =
      previousString[timeframe] +
      " - " +
      activity.timeframes[timeframe].previous +
      "hrs";
    previous.dataset.previous = activity.timeframes[timeframe].previous;
  }
}

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
