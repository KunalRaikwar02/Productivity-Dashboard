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
  var currentTask = []

  if (localStorage.getItem("currentTask")) {
       currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum = sum + `<div class="task">
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

  var hours = Array.from({length:18}, (elem, idx) => {
    let startHour = 6 + idx;
    let endHour = startHour + 1;
    return `${formatTime(startHour)} - ${formatTime(endHour)}`;
  });

var wholeDaySum = "";

hours.forEach(function(elem, idx){
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

dayPlannerInput.forEach(function(elem){
  elem.addEventListener("input", function(){
    dayPlanData[elem.id] = elem.value;
    localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
  });
});
}
dailyPlanner();

function motivationalQuote(){
var motivationQuoteContent = document.querySelector(".motivation-2 h1");
var motivationAuthor = document.querySelector(".motivation-3 h2");

async function fetchQuote(){
  let response = await fetch("https://dummyjson.com/quotes/random")
  let data = await response.json();

  motivationQuoteContent.innerHTML = data.quote
  motivationAuthor.innerHTML = data.author
}

fetchQuote()
}
motivationalQuote()


