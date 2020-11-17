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
var op1 = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
]; // первый операнд
var op = ["+", "-", "*"]; // оператор
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

canvas.height = canvasWraper.offsetHeight; // на всю высоту экрана
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

  let fall1 = setInterval(function () {
    drawLand();
  }, 50);

  // Stop the drop at anytime with this code :
  //clearInterval(fall1);
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
  c.drawImage(img, innerWidth / 38, canvas.height / 1.5, 600, 500); //рисуем картинку в канвас
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
  wave(waterLevel, (increment2 -= 0.03));
  c.stroke();
  c.strokeStyle = FILL_BLUE;
  c.closePath();

  c.beginPath();
  c.moveTo(0, ch / 2);
  wave(waterLevel - 1, (increment1 += 0.05));
  c.stroke();
  c.strokeStyle = FILL_BLUE;
  c.closePath();

  w += 0.05;
}

function drawLand() {
  drawBackground();
  animateWave();
  drop1.drawDrop;
  drop2.drawDrop;
  drop3.drawDrop;
  drop1.waterLevel;
  drop2.waterLevel;
  drop3.waterLevel;
  drop1.ypos = 0;
  drop2.ypos = 0;
  drop3.ypos = 0;
  // Make the 3rd drop falls
}

// класс капли
class Drop {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.op1 = options.op1;
    this.op2 = options.op2;
    this.op = options.op;
    this.speed = options.speed;
    this.blowup = options.blowup;
    this.c = options.c;
  }

  get answer() {
    if (this.op1 > this.op2) {
      var operand1 = this.op2;
      var operand2 = this.op1;
    } else {
      var operand2 = this.op2;
      var operand1 = this.op1;
    }
    if (this.op == "+") {
      return operand2 + operand1;
    }
    if (this.op == "-") {
      return operand2 - operand1;
    }
    if (this.op == "*") {
      return operand2 * operand1;
    }
  }

  get waterLevel() {
    if (this.y >= ch - waterLevelUp) {
      this.speed = -ch;
      console.log(waterLevel);
      return  waterLevel -= 1;
    }
  }
  get drawDrop() {
    if (this.op1 > this.op2) {
      var operand1 = this.op2;
      var operand2 = this.op1;
    } else {
      var operand2 = this.op2;
      var operand1 = this.op1;
    }
    this.c.beginPath();
    this.c.fillStyle = "blue";
    this.c.moveTo(this.x - 60, this.y);
    this.c.lineTo(this.x, this.y - 150);
    this.c.lineTo(this.x + 60, this.y);
    this.c.arc(this.x, this.y, 60, 0, Math.PI);
    this.c.closePath();
    this.c.fill();

    this.c.beginPath();
    this.c.arc(this.x, this.y + 4, 50, 0, Math.PI * 2);
    this.c.fillStyle = FILL_DARK_BLUE;
    this.c.fill();
    this.c.closePath();

    this.c.beginPath();
    this.c.textAlign = "center";
    this.c.fillStyle = "white";
    this.c.font = "bold 40px serif";
    this.c.fillText(`${operand2}`, this.x, this.y);
    this.c.fillText(`${this.op}`, this.x - 35, this.y + 20);
    this.c.fillText(`${operand1}`, this.x, this.y + 40);
    this.c.closePath();
  }

  set xpos(xpos) {
    this.x = xpos;
  }
  set ypos(ypos) {
    this.y += ypos + this.speed;
  }
}
// сoздание новой капли из класса Drop
let drop1 = new Drop({
  x: randomInt(250, cw - 30),
  y: randomInt(-140, -250),
  op1: op1[randomInt(0, 19)],
  op2: op1[randomInt(0, 19)],
  op: op[randomInt(0, 1)],
  speed: 1,
  blowup: false,
  c: c,
});
let drop2 = new Drop({
  x: randomInt(150, cw - 150),
  y: randomInt(-70, -140),
  op1: op1[randomInt(0, 19)],
  op2: op1[randomInt(0, 19)],
  op: op[randomInt(0, 1)],
  speed: 1,
  blowup: false,
  c: c,
});
let drop3 = new Drop({
  x: randomInt(40, cw - 250),
  y: randomInt(-30, -70),
  op1: op1[randomInt(0, 19)],
  op2: op1[randomInt(0, 19)],
  op: op[randomInt(0, 1)],
  speed: 1,
  blowup: false,
  c: c,
});
