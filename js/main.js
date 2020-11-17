const FILL_DARK_BLUE = "rgba(0,0,60, 0.5)";
const FILL_BLUE = "rgba(0,0,155, 0.5)";
const FILL_TURQUISE = "#22abcd";

let startScreen = document.getElementById("startScreen");
let playButton = document.getElementById("playButton");
let howButton = document.getElementById("howButton");
let option = document.getElementById("option");
let scoreDisplay = document.getElementById("score");
let header = document.getElementById("header");
let h1 = document.getElementById("h1");
let canvas = document.getElementById("land");
let canvasWraper = document.getElementById("canvas");
let sc = document.getElementById("sc");
let idAudio = document.getElementById("idAudio");

let score = 0; // очки
let HiScore = 0; // рекорд по очкам
let speed = randomInt(50, 100); // скорость капель
var op1 = [1, 2, 3, 4]; // первый операнд
var op2 = [1, 2, 3, 4]; // второй операнд
var op = ["+", "-", "*", "/"]; // оператор
let drops = [];
let answer = 0; // ответ
let waterLevel = 9; // уровень воды для волн
let waterLevelUp = 100; // уровень поднятия воды для капель
let isPlayed = false; // игра запущена или нет
let isPaused = false; //поставлена пауза
let isMuted = false; // звук выключен или нет
let elem = document.documentElement;
let isFullScreen = false;
let c = canvas.getContext("2d");
let x = 100;
let y = 260;

canvas.height = innerHeight; // на всю высоту экрана
canvas.width = canvasWraper.offsetWidth; // на всю ширину canvasWraper
let ch = canvas.height;
let cw = canvas.width;

let frequency = 0.008;
let amplitude = 10;
let increment1 = frequency;
let increment2 = frequency;
let w = 0.5;

var bg = 0;
var fall1 = 0;
var fall2 = 0;
var fall3 = 0;

playButton.addEventListener("click", () => {
  newGame();
});

sc.addEventListener("click", addScore);

addEventListener("resize", () => {
  canvas.height = canvasWraper.offsetHeight;
  canvas.width = canvasWraper.offsetWidth;
  ch = canvas.height;
  cw = canvas.width;
});

var bg = setInterval(function () {
  drawLand();
}, 50);

function addScore() {
  score += 100;
  scoreDisplay.textContent = `Score: ${score}`;
  if (score > 100) {
    speed = randomInt(50, 100);
  }
  if (score > 200) {
    speed = randomInt(30, 50);
  }
  if (score > 300) {
    speed = randomInt(20, 30);
  }
  if (score > 600) {
    speed = randomInt(10, 20);
  }
  if (score > 900) {
    speed = randomInt(5, 10);
  }
  if (score > 1200) {
    speed = randomInt(3, 5);
  }
  if (score > 1500) {
    speed = randomInt(2, 3);
  }
  if (score > 2500) {
    speed = randomInt(1, 2);
    clearInterval(fall1);
    clearInterval(fall2);
    clearInterval(fall3);
    makeit(speed);
  }
}

function newGame() {
  //document.location.reload();

  score = 0; // очки
  HiScore = 0; // рекорд по очкам
  speed = randomInt(50, 100); // скорость капель
  op1 = [1, 2, 3, 4]; // первый операнд
  op2 = [1, 2, 3, 4]; // второй операнд
  op = ["+", "-", "*", "/"]; // оператор
  drops = [];
  answer = 0; // ответ
  waterLevel = 9; // уровень воды для волн
  waterLevelUp = 100; // уровень поднятия воды для капель
  isPlayed = false; // игра запущена или нет
  isPaused = false; //поставлена пауза
  isMuted = false; // звук выключен или нет
  elem = document.documentElement;
  isFullScreen = false;
  c = canvas.getContext("2d");
  x = 100;
  y = 260;
  header.classList.remove("header-new-game");
  h1.classList.remove("h1-new-game");
  startScreen.classList.remove("start-screen-new-game");
  playButton.classList.remove("start-screen-button-new-game");
  howButton.classList.remove("start-screen-button-new-game");
  option.classList.remove("option-new-game");

  setInterval(function () {
    drawLand();
  }, 20);
}

function setStorage(nameKey, valueKey) {
  localStorage.setItem(nameKey, valueKey);
}

function getStorage(nameKey, valueKey) {
  return localStorage.getItem(nameKey, valueKey);
}

function setValueFromLocalStorage(localStorageId, element) {
  // изменение локального хранилища имени
  if (localStorage.getItem(localStorageId) === null) {
    element.textContent = `[Введите ${localStorageId}]`;
  } else {
    element.textContent = localStorage.getItem(localStorageId);
  }
}

function setValueToLocalStorage(e, localStorageId) {
  //записать имя в локальное хранилище
  if (e.type === "keypress") {
    if (e.witch == 13 || e.keyCode == 13) {
      localStorage.setItem(localStorageId, e.target.textContent);
    }
  } else {
    localStorage.setItem(localStorageId, e.target.textContent);
  }
}

function play(idAudio) {
  idAudio.play();
}

function pause(idAudio) {
  idAudio.pause();
}

function randomInt(min, max) {
  // случайное число от min до (max+1)

  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function openFullscreen() {
  // открывает на fullscreen
  elem.requestFullscreen();
  isFullScreen = true;
}

function closeFullscreen() {
  // сворачивает fullscreen
  document.exitFullscreen();
  isFullScreen = false;
}

function drawBackground() {
  c.fillStyle = FILL_TURQUISE;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fill();

  var img = new Image(); // Создаём новый объект Image
  img.src = "media/stone.svg"; // Устанавливаем путь к источнику
  c.drawImage(img, innerWidth / 10, canvas.height / 2, 600, 606); //рисуем картинку в канвас
  //c.drawImage(img, -(innerWidth / 2), innerWidth / 0.85, 2000, 1006); рисуем картинку2 в канвас
}

function animateWave() {
  function wave(waterLevel, increment) {
    for (let x = 0; x < cw; x++) {
      for (let y = waterLevel - 1; y < 20; y++) {
        c.lineTo(
          x,
          y * 60 +
            ch / 2 +
            Math.sin(x * frequency + increment) * amplitude * Math.sin(w)
        );
      }
    }
  }

  c.beginPath();
  c.moveTo(0, ch / 2);
  wave(waterLevel, increment2 -= 0.03);
  c.stroke();
  c.strokeStyle = FILL_BLUE;
  c.closePath();

  c.beginPath();
  c.moveTo(0, ch / 2);
  wave(waterLevel - 1, increment1 += 0.05);
  c.stroke();
  c.strokeStyle = FILL_BLUE;
  c.closePath();

  w += 0.05;
}

function drawLand() {
  drawBackground();
  animateWave();
  init();
  // Make the 3rd drop falls
  updateDrop(1);
  updateDrop(2);
  updateDrop(3);
  // Stop the drop at anytime with this code :
  //clearInterval(fall);
}

function init() {
  canvas.style.border = "1px solid black";
  // Draw drops
  var xpos = [
    randomInt(30, cw - 200),
    randomInt(30, cw - 100),
    randomInt(30, cw - 30),
    400,
  ];
  var ypos = [
    randomInt(-60, -550),
    randomInt(-470, -650),
    randomInt(-670, -960),
    -120,
  ];

  for (i = 0; i < xpos.length; i++) {
    drops.push(drawDrop(xpos[i], ypos[i], op1[i], op[i], op2[i]));
  }
}

function drawDrop(x = 1, y = 1, op1 = 1, op = "+", op2 = 2) {
  c.beginPath();
  c.fillStyle = "blue";
  c.moveTo(x - 60, y);
  c.lineTo(x, y - 150);
  c.lineTo(x + 60, y);
  c.arc(x, y, 60, 0, Math.PI);
  c.closePath();
  c.fill();

  c.beginPath();
  c.arc(x, y + 4, 50, 0, Math.PI * 2);
  c.fillStyle = FILL_DARK_BLUE;
  c.fill();
  c.closePath();

  c.beginPath();
  c.textAlign = "center";
  c.fillStyle = "white";
  c.font = "bold 40px serif";
  c.fillText(`${op1}`, x, y);
  c.fillText(`${op}`, x - 35, y + 20);
  c.fillText(`${op2}`, x, y + 40);
  c.closePath();

  return {
    x: x,
    y: y,
    op1: op1,
    op: op,
    op2: op2,
  };
}

function updateDrop(dropNumber) {
  // Update position
  if (drops[dropNumber].y >= canvas.height - waterLevelUp) {
    waterLevelUp += 50;
    waterLevel -= 1;
    console.log("уровень воды " + waterLevelUp);
    if (waterLevelUp >= 360) {
      console.log("Game over");
      clearInterval();
      bg = 0;
      drops[dropNumber].y = -randomInt(60, 100);
      isPlayed = false;
      if (!isPlayed) {
        header.classList.add("header-new-game");
        h1.classList.add("h1-new-game");
        startScreen.classList.add("start-screen-new-game");
        playButton.classList.add("start-screen-button-new-game");
        howButton.classList.add("start-screen-button-new-game");
        option.classList.add("option-new-game");
      } else {
        header.classList.toggle("header-new-game");
        h1.classList.toggle("h1-new-game");
        startScreen.classList.toggle("start-screen-new-game");
        playButton.classList.toggle("start-screen-button-new-game");
        howButton.classList.toggle("start-screen-button-new-game");
        option.classList.toggle("option-new-game");
      }
    }
    drops[dropNumber].y = -randomInt(60, 100);
  } else {
    drops[dropNumber].y += 5;
  }
  //Draw drops
  for (i = 0; i < drops.length; i++) {
    drawDrop(drops[i].x, drops[i].y, drops[i].op1, drops[i].op, drops[i].op2);
  }
}
