let score = 0;  // очки
let speed = 0;  // скорость капель
let level = 0;  // уровень
let op1 = 0;    // первый операнд
let op2 = 0;    // второй операнд
let isPlayed = false; // игра запущена или нет
let isMuted = false; // звук выключен или нет
let elem = document.documentElement;
let canvas = document.getElementById('land');
let canvasWraper = document.getElementById('canvas');
let isFullScreen = false;
let c = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = canvasWraper.offsetWidth;
let ch = canvas.height;
let cw = canvas.width;

frequency = 0.008;
amplitude = 20;
increment1 = frequency;
increment2 = frequency;
w = 0.5;

function play(idAudio) { //воспроизводит по id аудио
	let x = document.getElementById(idAudio);
	x.play();
}

function pause(idAudio) { //ставить на паузу по id аудио
	let x = document.getElementById(idAudio);
	x.pause();
}

function randomInteger(min, max) {    // случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function openFullscreen() { // открывает на fullscreen
	elem.requestFullscreen();
	isFullScreen = true;
}

function closeFullscreen() { // сворачивает fullscreen
	document.exitFullscreen();
	isFullScreen = false;
}



function land() {
	c.clearRect(0, 0, cw, ch);
	requestAnimationFrame(land);

	var img = new Image();   // Создаём новый объект Image
	img.src = 'media/svg-2346025.svg'; // Устанавливаем путь к источнику
	c.drawImage(img, innerWidth / 10, canvas.height / 2, 600, 606); //рисуем картинку в канвас
	c.drawImage(img, -(innerWidth / 2), innerWidth / 0.85, 2000, 1006); //рисуем картинку в канвас

	var img = new Image();   // Создаём новый объект Image
	img.src = 'media/Bunny.svg'; // Устанавливаем путь к источнику
	c.drawImage(img, innerWidth / 5.4, canvas.height / 2.1, 300, 300); //рисуем картинку в канвас
	
}

function animateWave() {
	requestAnimationFrame(animateWave);

	c.beginPath();
	c.moveTo(0, ch / 2);
	for (let x = 0; x < cw; x++) {
		for (let y = 7; y < 20; y++) {
			c.lineTo(x, y * 60 + ch / 2 + Math.sin(x * frequency + increment2) * amplitude * Math.sin(w));
		}
	}
	c.stroke();
	c.strokeStyle = 'rgba(0,0,155, 0.5)';
	c.closePath();

	c.beginPath();
	c.moveTo(0, ch / 2);
	for (let x = 0; x < cw; x++) {
		for (let y = 8; y < 20; y++) {
			c.lineTo(x, y * 60 + ch / 2 + Math.sin(x * frequency + increment1) * amplitude * Math.sin(w));
		}
	}
	c.stroke();
	c.strokeStyle = 'rgba(0,0,155, 0.5)';
	c.closePath();

	increment1 += 0.05;
	increment2 -= 0.03;
	w += 0.05

}
function rainDrop() {
	requestAnimationFrame(rainDrop);
	
}

land();
animateWave();
rainDrop();

addEventListener('resize', () => {
	canvas.height = canvasWraper.offsetHeight;
	canvas.width = canvasWraper.offsetWidth;
	ch = canvas.height;
	cw = canvas.width;
});

console.clear();