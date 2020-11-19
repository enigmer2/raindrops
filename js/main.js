const FILL_DARK_BLUE = "rgba(0,0,60, 0.5)";
const FILL_BLUE = "rgba(0,0,155, 0.5)";
const FILL_TURQUISE = "#22abcd";
const FILL_ORANGE = "#f3d44a";

const audioFone = document.getElementById("fone");
const audioFalse = document.getElementById("false");
const audioTrue = document.getElementById("true");
const audioDrop1 = document.getElementById("drop1");
const audioDrop2 = document.getElementById("drop2");
const audioDrop3 = document.getElementById("drop3");
const audioDrop = [audioDrop1, audioDrop2, audioDrop3];

let startScreen = document.getElementById("startScreen");
let playButton = document.getElementById("playButton");
let howButton = document.getElementById("howButton");
let option = document.getElementById("option");
let scoreDisplay = document.getElementById("score");
let header = document.getElementById("header");
let h1 = document.getElementById("h1");
let canvas = document.getElementById("land");
let canvasWraper = document.getElementById("canvas");
let idAudio = document.getElementById("idAudio");
let fullscreen = document.getElementById("fullOnOff");
let soundOnOff = document.getElementById("soundOnOff");
let display = document.getElementById("display"); // Выбор дисплэя
let buttons = document.querySelectorAll(".button-form_btn");

let userAnswer = 0; //по нажатию клавиши прибавляет к предыдущему вводу следуюю нажатую и по интеру проверяет ;
let score = 0; // очки
let HiScore = 0; // рекорд по очкам
let operandFirst = "";
let speed = 0; // скорость капель
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
let waterLevelUp = 60; // уровень поднятия воды для капель
let isPlayed = false; // игра запущена или нет
let isMuted = true; // звук выключен или нет
let elem = document.documentElement;
let isFullScreen = false;
let c = canvas.getContext("2d");
let x = 100;
let y = 260;
let indices = [];

canvas.height = canvasWraper.offsetHeight; // на всю высоту экрана
canvas.width = canvasWraper.offsetWidth; // на всю ширину canvasWraper
let ch = canvas.height;
let cw = canvas.width;

let frequency = 0.008;
let amplitude = 10;
let increment1 = frequency;
let increment2 = frequency;
let w = 0.5;

var fall;

playButton.addEventListener("click", () => {
  newGame();
});

addEventListener("resize", () => {
  canvas.height = canvasWraper.offsetHeight;
  canvas.width = canvasWraper.offsetWidth;
  ch = canvas.height;
  cw = canvas.width;
});

addEventListener("keydown", buttonPress); // листнер - нажатия клавишь на Num-клавитуре

for (let i = 0; i < buttons.length; i++) {
  // листнер  - нажатия клавишь на  виртуальной клавитуре
  let number = buttons[i];
  number.addEventListener("click", buttonPress);
}

function addScore() {
  score += 100;
  audioTrue.playbackRate = 2.0; // ускоряет музыку
  play(audioTrue);
  audioTrue.currentTime = 0;
  scoreDisplay.innerHTML = `<img src="media/star.svg" alt="" /> <span>Score: ${score}</span>`;
  if (score > 100) {
    drop1.speed = 2;
    drop2.speed = 2;
    drop3.speed = 2;
    drop4.speed = 7;
  }
  if (score > 200) {
    drop1.speed = 3;
    drop2.speed = 3;
    drop3.speed = 3;
    drop4.speed = 7;
  }
  if (score > 300) {
    drop1.speed = 4;
    drop2.speed = 4;
    drop3.speed = 4;
    drop4.speed = 7;
  }
  if (score > 600) {
    drop1.speed = 5;
    drop2.speed = 5;
    drop3.speed = 5;
    drop4.speed = 7;
  }
  if (score > 900) {
    drop1.speed = 6;
    drop2.speed = 6;
    drop3.speed = 6;
    drop4.speed = 7;
  }
  if (score > 1200) {
    drop1.speed = 7;
    drop2.speed = 7;
    drop3.speed = 7;
    drop4.speed = 7;
  }
}

function newGame() {
  operandFirst = "";
  display.value = "";
  while (dropAnswer.length > 0) {
    dropAnswer.pop();
  }

  drop1 = new Drop({});
  drop2 = new Drop({});
  drop3 = new Drop({});
  drop4 = new DropExp({});
  dropAnswer = [drop1.answer, drop2.answer, drop3.answer, drop4.answer];
  console.log(dropAnswer);

  drop1.answer;
  drop2.answer;
  drop3.answer;
  drop4.answer;

  drop1.y = randomInt(-30, -250);
  drop2.y = randomInt(-30, -250);
  drop3.y = randomInt(-30, -250);
  drop4.y = randomInt(-30, -1050);
  //document.location.reload();
  score = 0; // очки
  scoreDisplay.innerHTML = `<img src="media/star.svg" alt="" /> <span>Score: ${score}</span>`;
  speed = 1; // скорость капель
  answer = 0; // ответ
  waterLevel = 10; // уровень воды для волн
  waterLevelUp = 60; // уровень поднятия воды для капель
  isPlayed = true; // игра запущена или нет
  isPaused = false; //поставлена пауза
  isMuted = true; // звук выключен или нет
  elem = document.documentElement;
  c = canvas.getContext("2d");
  header.classList.remove("header-new-game");
  h1.classList.remove("h1-new-game");
  startScreen.classList.remove("start-screen-new-game");
  playButton.classList.remove("start-screen-button-new-game");
  howButton.classList.remove("start-screen-button-new-game");
  option.classList.remove("option-new-game");
  fall = setInterval(drawLand, 50);
  drop1.speed = 1;
  drop2.speed = 1;
  drop3.speed = 1;
  drop4.speed = 1;

  // Stop the drop at anytime with this code :
  //clearInterval(fall1);
}

function gameOver() {
  isPlayed = false; 
  
  gamePause();
  while (dropAnswer.length > 0) {
    dropAnswer.pop();
  }
  drop1.ypos = randomInt(-30, -250);
  drop2.ypos = randomInt(-30, -250);
  drop3.ypos = randomInt(-30, -250);
  drop4.ypos = randomInt(-30, -250);
  drop1.speed = 0;
  drop2.speed = 0;
  drop3.speed = 0;
  drop4.speed = 0;
  header.classList.add("header-new-game");
  h1.classList.add("h1-new-game");
  startScreen.classList.add("start-screen-new-game");
  playButton.classList.add("start-screen-button-new-game");
  howButton.classList.add("start-screen-button-new-game");
  option.classList.add("option-new-game");
  if (localStorage.getItem("HiScore") > localStorage.getItem("Score")) {
    setStorage("Score", score);
  } else {
    setStorage("HiScore", score);
  }
  clearInterval(fall);
}
function gamePause() {
  drop1.speed = 0;
  drop2.speed = 0;
  drop3.speed = 0;
  drop4.speed = 0;
}

function setStorage(nameKey, valueKey) {
  localStorage.setItem(nameKey, valueKey);
}

function play(idAudio) {
  idAudio.play();
}

function pause(idAudio) {
  idAudio.pause();
}

soundOnOff.addEventListener("click", () => {
  if (isMuted) {
    play(audioFone);
    isMuted = false;
    soundOnOff.classList.toggle("sound-off");
    soundOnOff.classList.toggle("sound-on");
  } else {
    pause(audioFone);
    isMuted = true;
    soundOnOff.classList.toggle("sound-off");
    soundOnOff.classList.toggle("sound-on");
  }
});

function randomInt(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

//листнер клика на fullscreen
fullscreen.addEventListener("click", () => {
  if (!isFullScreen) {
    elem.requestFullscreen();
    isFullScreen = true;
    fullscreen.classList.toggle("fullscreen-off");
    fullscreen.classList.toggle("fullscreen-on");
  } else {
    document.exitFullscreen();
    isFullScreen = false;
    fullscreen.classList.toggle("fullscreen-off");
    fullscreen.classList.toggle("fullscreen-on");
  }
});

function drawBackground() {
  c.fillStyle = FILL_TURQUISE;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fill();

  var img = new Image(); // Создаём новый объект Image
  img.src = "media/stone.svg"; // Устанавливаем путь к источнику
  c.drawImage(img, canvas.height / 25, canvas.height / 1.4, 600, 500); //рисуем картинку в канвас
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
  drop4.drawDrop;
  drop1.waterLevel;
  drop2.waterLevel;
  drop3.waterLevel;
  drop4.waterLevel;
  drop1.ypos = 0;
  drop2.ypos = 0;
  drop3.ypos = 0;
  drop4.ypos = 0;
  setStorage("Score", score);
  scoreDisplay.innerHTML = ` <img src="media/star.svg" alt="" /> <span>Score: ${score}</span>`;

  if (waterLevel <= 7) {
    gameOver();
  }
  // Make the 3rd drop falls
}

// класс капли
class Drop {
  constructor(options) {
    this.x = randomInt(280, cw - 30);
    this.y = options.y = randomInt(-30, -550);
    this.op1 = options.op1 = op1[randomInt(0, 19)];
    this.op2 = options.op2 = op1[randomInt(0, 19)];
    this.op = options.op = op[randomInt(0, 1)];
    this.speed = options.speed = 1;
    this.c = options.c = c;
    this.answer;
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
      //this.speed = -ch;
      this.y = -ch;
      waterLevelUp += 60;
      waterLevel -= 1;
      play(audioDrop[randomInt(0, 2)]);
      this.xpos = randomInt(30, cw - 30);
      this.ypos = randomInt(-30, -600);
      if (score <= 0) {
        score = 0;
      } else {
        score -= 20;
      }
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
    this.c.fillStyle = FILL_BLUE;
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

//особенная капля
class DropExp extends Drop {
  constructor(options) {
    super(options);
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
    this.c.fillStyle = FILL_BLUE;
    this.c.moveTo(this.x - 60, this.y);
    this.c.lineTo(this.x, this.y - 150);
    this.c.lineTo(this.x + 60, this.y);
    this.c.arc(this.x, this.y, 60, 0, Math.PI);
    this.c.closePath();
    this.c.fill();

    this.c.beginPath();
    this.c.arc(this.x, this.y + 4, 50, 0, Math.PI * 2);
    this.c.fillStyle = FILL_ORANGE;
    this.c.fill();
    this.c.closePath();

    this.c.beginPath();
    this.c.textAlign = "center";
    this.c.fillStyle = "BLACK";
    this.c.font = "bold 40px serif";
    this.c.fillText(`${operand2}`, this.x, this.y);
    this.c.fillText(`${this.op}`, this.x - 35, this.y + 20);
    this.c.fillText(`${operand1}`, this.x, this.y + 40);
    this.c.closePath();
  }
}

// сoздание новой капли из класса Drop
let drop1 = new Drop({});

let drop2 = new Drop({});

let drop3 = new Drop({});

let drop4 = new DropExp({});
let dropAnswer = [drop1.answer, drop2.answer, drop3.answer, drop4.answer];

function buttonPress(e) {
  //обработчик нажатия клавиш
  if (e.keyCode === undefined) {
    presedButton = e.target.textContent;
  } else {
    presedButton = e.keyCode;
  }
  // обработчик листнера нажатия клавиш
  switch (presedButton) {
    case "0":
    case 96: // если нажата клавиша 0
      operandFirst += 0;
      display.value = +operandFirst;
      break;
    case "1":
    case 97: // если нажата клавиша 1
      operandFirst += 1;
      display.value = +operandFirst;
      break;
    case "2":
    case 98: // если нажата клавиша 2
      operandFirst += 2;
      display.value = +operandFirst;
      break;
    case "3":
    case 99: // если нажата клавиша 3
      operandFirst += 3;
      display.value = +operandFirst;
      break;
    case "4":
    case 100: // если нажата клавиша 4
      operandFirst += 4;
      display.value = +operandFirst;
      break;
    case "5":
    case 101: // если нажата клавиша 5
      operandFirst += 5;
      display.value = +operandFirst;
      break;
    case "6":
    case 102: // если нажата клавиша 6
      operandFirst += 6;
      display.value = +operandFirst;
      break;
    case "7":
    case 103: // если нажата клавиша 7
      operandFirst += 7;
      display.value = +operandFirst;
      break;
    case "8":
    case 104: // если нажата клавиша 8
      operandFirst += 8;
      display.value = +operandFirst;
      break;
    case "9":
    case 105: // если нажата клавиша 9
      operandFirst += 9;
      display.value = +operandFirst;
      break;
    case "Delete":
    case 46:
      operandFirst = ""; // удаляет всё
      display.value = +operandFirst;
      // если нажата клавиша delete
      break;
    case "Enter":
    case 13:
      if (!isPlayed) {
        number.removeEventListener("click", buttonPress);
      }
      userAnswer += operandFirst; // Enter
      console.log(`Вывожу userAnswer: ${+userAnswer}`);
      chackAnswer(dropAnswer, +userAnswer);
      userAnswer = "";
      operandFirst = "";
      display.value = "";
      break;
    case "Clear":
    case 8:
      operandFirst = ""; // если нажата клавиша backspace удаляет текущий операнд
      display.value = +operandFirst;
      break;
  }

  // вычисления после нажатия кнопки
}



var idx = dropAnswer.indexOf(+userAnswer);
while (idx != -1) {
  indices.push(idx);
  idx = dropAnswer.indexOf(+userAnswer, idx + 1);
}

function chackAnswer(dropAnswer, userAnswer) {
  function logArrayElements(element, index) {
    if (userAnswer === element) {
      console.log(index);
      switch (index) {
        case 0:
          drop1 = new Drop({
            y: randomInt(-30, -550),
          });
          dropAnswer.splice(index, 1, drop1.answer);
          console.log(dropAnswer);
          addScore();
          break;
        case 1:
          drop2 = new Drop({});
          dropAnswer.splice(index, 1, drop2.answer);
          console.log(dropAnswer);
          addScore();
          break;
        case 2:
          drop3 = new Drop({});
          dropAnswer.splice(index, 1, drop3.answer);
          console.log(dropAnswer);
          addScore();
          break;
        case 3:
          drop1 = new Drop({});
          dropAnswer.splice(0, 1, drop1.answer);
          drop2 = new Drop({});
          dropAnswer.splice(1, 1, drop2.answer);
          drop3 = new Drop({});
          dropAnswer.splice(2, 1, drop3.answer);
          drop4 = new DropExp({});
          dropAnswer.splice(3, 1, drop4.answer);
          console.log(dropAnswer);
          addScore();
          break;
      }
    }
  }

  if (dropAnswer.includes(+userAnswer)) {
    // addScore();
    dropAnswer.forEach(logArrayElements);
  } else {
    if (score > 0) {
      score -= 20;
    }
    play(audioFalse);
    audioFalse.currentTime = 0;
    
  }
}
// Hiscore не рапботает корректно 
// функция показа очки и Hiscore в конце игры 

// отключить листнер нажатия клавиш на клавиатуре

// функция показать как надо играть 
//// проверить if( drop.xpos === 0) { gamePause(); и вывести сообщение о том что надо делать }
////  