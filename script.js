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
// openFeatures();

var form = document.querySelector(".addTask form");
var taskInput = document.querySelector(".addTask form #task-input");
var taskDetailsInput = document.querySelector(".addTask form textarea");
var taskCheckbox = document.querySelector(".addTask form #check");

let currentTask = [
    {
        task: "Sample Task",
        details: "This is a sample task details.",
        important: true
    },
    {
        task: "Sample Task 2",
        details: "This is another sample task details.",
        important: false
    },
    {
        task: "Sample Task 3",
        details: "This is yet another sample task details.",
        important: true
    },

];

// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     console.log(taskInput.value);
//     console.log(taskDetailsInput.value);
//     console.log(taskCheckbox.checked);
// })

var allTasks = document.querySelector(".allTask");
