function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
    <h5>${elem.task} <span class=${elem.important}>imp</span></h5>
    <button id=${idx}>Mark as Complete</button>
    </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      important: taskCheckbox.checked,
    });
    renderTask();
    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}
todoList();

function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var dayPlanner = document.querySelector(".day-planner");

  function formatTime(hour) {
    let ampm = hour >= 12 ? "PM" : "AM";
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;
    return hour12 + ":00 " + ampm;
  }

  var hours = Array.from({ length: 18 }, (elem, idx) => {
    let startHour = 6 + idx;
    let endHour = startHour + 1;
    return `${formatTime(startHour)} - ${formatTime(endHour)}`;
  });

  var wholeDaySum = "";

  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || "";
    wholeDaySum += `
    <div class="day-planner-time">
      <p>${elem}</p>
      <input id="${idx}" type="text" placeholder="..." value="${saveData}">
    </div>
  `;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startbtn = document.querySelector(".pomo-timer .start-timer");
  var pausebtn = document.querySelector(".pomo-timer .pause-timer");
  var resetbtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let timerInterval = null;
  let totalSeconds = 25 * 60;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--tri4)";
          session.style.color = "black";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--tri3)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }

  startbtn.addEventListener("click", startTimer);
  pausebtn.addEventListener("click", pauseTimer);
  resetbtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

var header1Time = document.querySelector(".header1 h1");
var header1Date = document.querySelector(".header1 h2");
var header2Temp = document.querySelector('.header2 h2');
var header2Condition = document.querySelector('.header2 .condition');
var wind = document.querySelector('.header2 .wind');
var humidity = document.querySelector('.header2 .humidity');
var headIndex = document.querySelector('.header2 .heatIndex');

// NOTE: API key restricted to this domain only
// “Add your own WeatherAPI key to enable live weather data.”
var apiKey = "YOUR_API_KEY";

var city = "Pune";

// WEATHER API
async function weatherAPICall() {
  var response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );

  var data = await response.json();

  header2Temp.innerHTML = `${data.current.temp_c}°C`;
  header2Condition.innerHTML = `${data.current.condition.text}`;
  wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
  humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  headIndex.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`;
}
weatherAPICall();

// TIME & DATE
function timeDate() {
  const totalDaysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var date = new Date();
  var dayOfWeek = totalDaysOfWeek[date.getDay()];
  var hours = date.getHours();
  var minutes = date.getMinutes().toString().padStart(2, "0");
  var seconds = date.getSeconds().toString().padStart(2, "0");
  var date1 = date.getDate()
  var month = monthNames[date.getMonth()]
  var year = date.getFullYear()

  header1Date.innerHTML = `${date1} ${month}, ${year}`

 var ampm = hours >= 12 ? "PM" : "AM";
 hours = hours % 12 || 12;
 header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(2,'0')}:${minutes}:${seconds} ${ampm}`;
}
timeDate();
setInterval(timeDate, 1000); // live clock


