let score = 0; // очки
let HiScore = 0; // рекорд по очкам
let speed = randomInteger(5, 10); // скорость капель
let level = 0; // уровень
let op1 = 0; // первый операнд
let op2 = 0; // второй операнд
let op = ""; // оператор
let answer = 0; // ответ
let waterLevelUp = 200; // уровень воды
let isPlayed = false; // игра запущена или нет
let isMuted = false; // звук выключен или нет
let elem = document.documentElement;
let canvas = document.getElementById("land");
let canvasWraper = document.getElementById("canvas");
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

function randomInteger(min, max) {
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

function makeit() {
  // These variables can be used in the drawing functions
  var drops = [];

  // Init canvas & drops
  init();
  // Make the 3rd drop falls
  var fall = setInterval(function () {
    updateDrop(3);
  }, speed);

  // Make the 7th drop falls
  var fall2 = setInterval(function () {
    updateDrop(7);
  }, speed);
  var fall3 = setInterval(function () {
    updateDrop(4);
  }, speed);

  // Stop the drop at anytime with this code :
  //clearInterval(fall);

  function animateWave() {
    c.beginPath();
    c.moveTo(0, ch / 2);
    for (let x = 0; x < cw; x++) {
      for (let y = 8; y < 20; y++) {
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
      for (let y = 9; y < 20; y++) {
        c.lineTo(
          x,
          y * 60 +
            ch / 2 +
            Math.sin(x * frequency + increment1) * amplitude * Math.sin(w)
        );
      }
    }
    c.stroke();
    c.strokeStyle = "rgba(0,0,155, 0.5)";
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
    var xpos = [100, 250, 300, 400, 500, 160, 100, 110, 176];
    var ypos = [-60, -160, -160, -20, -60, -60, -60, -60, -60];
    for (i = 0; i < xpos.length; i++) {
      drops.push(drawDrop(xpos[i], ypos[i]));
    }
  }

  function drawBackground() {
    c.fillStyle = "#2fbcdb";
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

  function drawDrop(x, y, op1 = 52, op = "+", op2 = 60) {
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
    c.fillStyle = "rgba(0,0,200, 0.5)";
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
    c.clearRect(canvas.width / 2, canvas.height - 30, cw, ch);
    return {
      x: x,
      y: y,
    };
  }

  function updateDrop(dropNumber) {
    var dropNumber = dropNumber - 1; //Because 0 is first
    // Update position
    if (drops[dropNumber].y >= canvas.height - waterLevelUp) {
      waterLevelUp += 20;
      console.log("повысить уровень воды ");
      console.log(waterLevelUp);

      if (waterLevelUp === 500) {
        console.log("Game over");
        clearInterval(fall);
        clearInterval(fall2);
        clearInterval(fall3);
      }
      drops[dropNumber].y = -randomInteger(60, 100);
    } else {
      drops[dropNumber].y += 3;
    }
    //Draw background
    drawBackground();
    animateWave();
    //Draw drops
    for (i = 0; i < drops.length; i++) {
      drawDrop(drops[i].x, drops[i].y);
    }
  }
}
window.onload = makeit;
