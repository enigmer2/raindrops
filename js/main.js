let score = 0; // очки
let HiScore = 0; // рекорд по очкам
let speed = randomInt(5, 10); // скорость капель
let level = 0; // уровень
let op1 = 0; // первый операнд
let op2 = 0; // второй операнд
let op = ""; // оператор
let answer = 0; // ответ
let waterLevel = 9; // уровень воды для волн
let waterLevelUp = 100; // уровень поднятия воды для капель
let isPlayed = false; // игра запущена или нет
let isPaused = false; //поставлена пауза
let isMuted = false; // звук выключен или нет
let elem = document.documentElement;
let canvas = document.getElementById("land");
let canvasWraper = document.getElementById("canvas");

let header = document.getElementById("header");
let h1 = document.getElementById("h1");
let startScreen = document.getElementById("startScreen");
let playButton = document.getElementById("playButton");
let howButton = document.getElementById("howButton");
let option = document.getElementById("option");

let isFullScreen = false;
let c = canvas.getContext("2d");
let x = 100;
let y = 260;

canvas.height = innerHeight; // на всю высоту экрана
canvas.width = canvasWraper.offsetWidth; // на всю ширину canvasWraper
let ch = canvas.height;
let cw = canvas.width;

frequency = 0.008;
amplitude = 10;
increment1 = frequency;
increment2 = frequency;
w = 200.5;

playButton.addEventListener("click", () => {
  newGame();
  console.log(isPlayed);
});

function newGame() {
  //document.location.reload();
  waterLevelUp = 100;
  waterLevel = 9;
  isPlayed = true;
  console.log(isPlayed);
  score = 0; // сбрасываем очки
  speed = randomInt(5, 10); // сбрасываем  скорость капель
  level = 0; // сбрасываем  уровень
  op1 = 0; // сбрасываем первый операнд
  op2 = 0; // сбрасываем второй операнд
  op = ""; // сбрасываем оператор
  header.classList.remove("header-new-game");
  h1.classList.remove("h1-new-game");
  startScreen.classList.remove("start-screen-new-game");
  playButton.classList.remove("start-screen-button-new-game");
  howButton.classList.remove("start-screen-button-new-game");
  option.classList.remove("option-new-game");
  makeit();
}

// обработчик нажатия клавиш
function buttonPress(e) {
  if (e.keyCode === undefined) {
    presedButton = e.target.textContent;
  } else {
    presedButton = e.keyCode;
  }
  // обработчик листнера нажатия клавиш
  switch (presedButton) {
    case "0":
    case 96: // если нажата клавиша 0
      //тут функция вводит 0 в память
      break;
    case "1":
    case 97: // если нажата клавиша 1
      //тут функция вводит 1 в память
      break;
    case "2":
    case 98: // если нажата клавиша 2
      //тут функция вводит 2 в память
      break;
    case "3":
    case 99: // если нажата клавиша 3
      //тут функция вводит 3 в память
      break;
    case "4":
    case 100: // если нажата клавиша 4
      //тут функция вводит 4 в память
      break;
    case "5":
    case 101: // если нажата клавиша 5
      //тут функция вводит 5 в память
      break;
    case "6":
    case 102: // если нажата клавиша 6
      //тут функция вводит 6 в память
      break;
    case "7":
    case 103: // если нажата клавиша 7
      //тут функция вводит 7 в память
      break;
    case "8":
    case 104: // если нажата клавиша 8
      //тут функция вводит 8 в память
      break;
    case "9":
    case 105: // если нажата клавиша 9
      //тут функция вводит 9 в память
      break;
    case "Delete": // удаляет всё
    case 46: // если нажата клавиша delete
      //тут функция удаления
      break;
    case "Enter":
    case 13:
      //тут функция ввода
      break;
    case "Clear":
    case 8:
      //тут функция очистки
      break;
  }

  // листнер - нажатия клавишь на Num-клавитуре
  addEventListener("keydown", buttonPress);

  // листнер  - нажатия клавишь на  виртуальной клавитуре
  for (let i = 0; i < buttons.length; i++) {
    let number = buttons[i];
    number.addEventListener("click", buttonPress);
  }
}

function setStorage(nameKey, valueKey) {
  localStorage.setItem(nameKey, valueKey);
}
function getStorage(nameKey, valueKey) {
  return localStorage.getItem(nameKey, valueKey);
}

// изменение локального хранилища имени
function setValueFromLocalStorage(localStorageId, element) {
  if (localStorage.getItem(localStorageId) === null) {
    element.textContent = `[Введите ${localStorageId}]`;
  } else {
    element.textContent = localStorage.getItem(localStorageId);
  }
}

//записать имя в локальное хранилище
function setValueToLocalStorage(e, localStorageId) {
  if (e.type === "keypress") {
    if (e.witch == 13 || e.keyCode == 13) {
      localStorage.setItem(localStorageId, e.target.textContent);
    }
  } else {
    localStorage.setItem(localStorageId, e.target.textContent);
  }
}

function play(idAudio) {
  //воспроизводит по id аудио
  let x = document.getElementById(idAudio);
  x.play();
}

function pause(idAudio) {
  //ставить на паузу по id аудио
  let x = document.getElementById(idAudio);
  x.pause();
}

function randomInt(min, max) {// случайное число от min до (max+1)
  
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function randExpr(level) {// в зависимости от уровня level
  
  // и от уровня зависит на сколько сложыне символы будут
  if (level === 0) {
    return; //возвращаяет выражение
  } else if (level === 1) {
    return; //возвращаяет выражение
  } else if (level === 2) {
    return; //возвращаяет выражение
  } else if (level === 3) {
    return; //возвращаяет выражение
  }
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

function makeit() {
  // These variables can be used in the drawing functions
  var drops = [];

  // Init canvas & drops
  init();
  // Make the 3rd drop falls
  var fall1 = setInterval(function () {
    updateDrop(1);
  }, speed);
  var fall2 = setInterval(function () {
    updateDrop(2);
  }, speed);
  var fall3 = setInterval(function () {
    updateDrop(3);
  }, speed);

  // Stop the drop at anytime with this code :
  //clearInterval(fall);

  function animateWave() {
    c.beginPath();
    c.moveTo(0, ch / 2);
    for (let x = 0; x < cw; x++) {
      for (let y = waterLevel - 1; y < 20; y++) {
        c.lineTo(
          x,
          y * 60 +
            ch / 2 +
            Math.sin(x * frequency + increment2) * amplitude * Math.sin(w)
        );
      }
    }
    c.stroke();
    c.strokeStyle = "rgba(0,0,155, 0.5)";
    c.closePath();

    c.beginPath();
    c.moveTo(0, ch / 2);
    for (let x = 0; x < cw; x++) {
      for (let y = waterLevel; y < 20; y++) {
        c.lineTo(
          x,
          y * 60 +
            ch / 2 +
            Math.sin(x * frequency + increment1) * amplitude * Math.sin(w)
        );
      }
    }
    c.stroke();
    c.strokeStyle = "rgba(0,0,130, 0.5)";
    c.closePath();

    increment1 += 0.05;
    increment2 -= 0.03;
    w += 0.05;
  }

  addEventListener("resize", () => {
    canvas.height = canvasWraper.offsetHeight;
    canvas.width = canvasWraper.offsetWidth;
    ch = canvas.height;
    cw = canvas.width;
  });

  // Functions
  function init() {
    canvas.style.border = "1px solid black";
    // Draw background
    drawBackground();
    // Draw drops
    var xpos = [
      randomInt(30, cw - 30),
      randomInt(30, cw - 30),
      randomInt(30, cw - 30),
      400,
    ];
    var ypos = [
      randomInt(-60, -250),
      randomInt(-270, -550),
      randomInt(-470, -960),
      -120,
    ];
    var op1 = [1, 2, 3, 4];
    var op = ["+", "-", "*", "/"];
    var op2 = [1, 2, 3, 4];
    for (i = 0; i < xpos.length; i++) {
      drops.push(drawDrop(xpos[i], ypos[i], op1[i], op[i], op2[i]));
    }
  }

  function drawBackground() {
    c.fillStyle = "#22bcdb";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fill();

    var img = new Image(); // Создаём новый объект Image
    img.src = "media/stone.svg"; // Устанавливаем путь к источнику
    c.drawImage(img, innerWidth / 10, canvas.height / 2, 600, 606); //рисуем картинку в канвас
    c.drawImage(img, -(innerWidth / 2), innerWidth / 0.85, 2000, 1006); //рисуем картинку в канвас

    var img = new Image(); // Создаём новый объект Image
    img.src = "media/Bunny.svg"; // Устанавливаем путь к источнику
    c.drawImage(img, innerWidth / 5.4, canvas.height / 2.1, 300, 300); //рисуем картинку в канвас
  }

  function drawDrop(x, y, op1 = 1, op = "+", op2 = 2) {
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
    c.fillStyle = "rgba(0,0,100, 0.5)";
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
    c.clearRect(canvas.width / 2, canvas.height, cw, ch);
    return {
      x: x,
      y: y,
      op1: op1,
      op: op,
      op2: op2,
    };
  }

  function updateDrop(dropNumber, op1, op, op2) {
    var dropNumber = dropNumber - 1; //Because 0 is first
    var op1 = op1;
    var op = op;
    var op2 = op2;

    // Update position
    if (drops[dropNumber].y >= canvas.height - waterLevelUp) {
      waterLevelUp += 50;
      waterLevel -= 1;
      console.log("уровень воды " + waterLevelUp);
      console.log(isPlayed);
      if (waterLevelUp >= 360) {
        console.log(isPlayed);
        console.log("Game over");
        clearInterval(fall1);
        clearInterval(fall2);
        clearInterval(fall3);
        isPlayed = false;
        console.log(isPlayed);
        if (!isPlayed) {
          header.classList.add("header-new-game");
          h1.classList.add("h1-new-game");
          startScreen.classList.add("start-screen-new-game");
          playButton.classList.add("start-screen-button-new-game");
          howButton.classList.add("start-screen-button-new-game");
          option.classList.add("option-new-game");
          console.log(isPlayed);
        } else {
          header.classList.toggle("header-new-game");
          h1.classList.toggle("h1-new-game");
          startScreen.classList.toggle("start-screen-new-game");
          playButton.classList.toggle("start-screen-button-new-game");
          howButton.classList.toggle("start-screen-button-new-game");
          option.classList.toggle("option-new-game");
          console.log(isPlayed);
        }
      }
      drops[dropNumber].y = -randomInt(60, 100);
    } else {
      drops[dropNumber].y += 3;
    }
    //Draw background
    drawBackground();
    animateWave();
    //Draw drops
    for (i = 0; i < drops.length; i++) {
      drawDrop(drops[i].x, drops[i].y, drops[i].op1, drops[i].op, drops[i].op2);
    }
  }
}
