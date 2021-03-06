/*
    Bruno DaSilva
    First Project 
    Drag and Drop Game halloween
    app.js File
*/

$(() => {
  //
  let correctMatch = 0;

  //Array of Icons
  let iconArray = [
    { name: "javaScript", class: "fab fa-js-square fa-5x" },
    { name: "react", class: "fab fa-react fa-5x" },
    { name: "css3", class: "fab fa-css3-alt fa-5x" },
    { name: "html5", class: "fab fa-html5 fa-5x" },
    { name: "vueJs", class: "fab fa-vuejs fa-5x" },
    { name: "python", class: "fab fa-python fa-5x" },
    { name: "angular", class: "fab fa-angular fa-5x" },
    { name: "php", class: "fab fa-php fa-5x" },
    { name: "debug", class: "fas fa-bug fa-5x" },
    { name: "github", class: "fab fa-github-alt fa-5x" }
  ];
  //Array of matching words
  let words = [
    "javaScript",
    "react",
    "css3",
    "html5",
    "vueJs",
    "python",
    "angular",
    "php",
    "debug",
    "github"
  ];

  $(init);

  function init() {
    // Hide the success message
    $("#successMessage").hide();

    $("#gameOverMessage").hide();

    // Reset the game
    correctMatch = 0;
    $("#dragItem").html("");
    $("#dropItem").html("");

    // Create the shuffle icons

    iconArray.sort(() => {
      return Math.random() - 0.5;
    });

    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let rgb = `rgb(${red}, ${green},${blue})`;

    // Create the icons to screen
    for (let i = 0; i < 10; i++) {
      $(`<i class=' ${iconArray[i].class}' > </i>`)
        .data("data", iconArray[i].name)
        .attr("id", `${iconArray[i].name}`)
        .css("color", `${rgb}`)
        .appendTo("#dragItem")
        .draggable({
          containment: "#content",
          stack: "#dragItem div",
          cursor: "grab",
          revert: true
        });
    }

    // Create the icons to screen
    words.sort(() => {
      return Math.random() - 0.5;
    });

    // Generate the words to the screen

    for (let i = 0; i < 10; i++) {
      // let className = word[i];
      $(`<div>${words[i]} </div>`)
        .data("data", words[i])
        .attr("id", `${words[i]}`)
        .css("font-size", "2rem")
        .appendTo("#dropItem")
        .droppable({
          accept: "#dragItem i",
          hoverClass: "hovered",
          drop: itemDrop
        });
    }
  }

  function itemDrop(event, ui) {
    let $iconData = $(this).data("data");
    let $wordData = ui.draggable.data("data");

    if ($wordData == $iconData) {
      ui.draggable.addClass("correct");
      ui.draggable.draggable("disable").css("color", "white");
      $(this).droppable("disable");
      ui.draggable.position({ of: $(this), my: "left top", at: "left top" });
      ui.draggable.draggable("option", "revert", false);
      correctMatch++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if (correctMatch == 10) {
      $("#successMessage").show();
    }
  }
});

const startGame = () => {
  // 10 minutes from now
  let minutes = 0.5;
  let currentTime = Date.parse(new Date());
  let deadline = new Date(currentTime + minutes * 60 * 1000);

  //Set the countDown structure
  function countDown(endtime) {
    let time = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 1000 / 60) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    let days = Math.floor(time / (1000 * 60 * 60 * 24));

    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function startCountDown(id, endtime) {
    let clock = document.getElementById(id);
    let gameOver = document.getElementById("gameOverMessage");

    function updateTime() {
      let newTime = countDown(endtime);
      let minutesP = `<p> Minutes: <span style="color: #f94c4c"> ${newTime.minutes}</span></p>`;
      let secondsP = `<p> Seconds: <span style="color: #f94c4c"> ${newTime.seconds}</span></p>`;

      clock.innerHTML = `${minutesP}` + " " + `${secondsP}`;

      if (newTime.total <= 0) {
        clearInterval(timeinterval);
        gameOver.style.display = "block";
      }
    }
    updateTime(); // run function once at first to avoid delay
    let timeinterval = setInterval(updateTime, 1000);
  }

  startCountDown("clockCountDown", deadline);
  hideStartMSG();
};

const hideStartMSG = () => {
  //Hides the start MSG
  document.getElementById("startGameHide").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("gameOverMessage").style.display = "none";
};
const resetGame = () => {
  // Reset the game
  window.location.reload();
};
