var elem = document.documentElement;

function openFullscreen() {
  elem.requestFullscreen();
}
function closeFullscreen() {
  document.exitFullscreen();
}

console.clear();
var canvas = document.querySelector('canvas');
var canvasWraper = document.getElementById('canvas');
var c = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = canvasWraper.offsetWidth;
var ch = canvas.height,
	 cw = canvas.width;

frequency = 0.008;
amplitude = 20;
increment1 = frequency;
increment2 = frequency;
w = 0.5;

function animate(){

	c.clearRect(0,0,cw,ch);
    requestAnimationFrame(animate);

    var img = new Image();   // Создаём новый объект Image
    img.src = 'media/svg-2346025.svg'; // Устанавливаем путь к источнику
    c.drawImage(img, innerWidth/10, canvas.height/2, 600, 606); //рисуем картинку в канвас
    c.drawImage(img, -(innerWidth/2), innerWidth/0.85, 2000, 1006); //рисуем картинку в канвас

    var img = new Image();   // Создаём новый объект Image
    img.src = '/media/Bunny.svg'; // Устанавливаем путь к источнику
    c.drawImage(img, innerWidth/5.4, canvas.height/2.1, 300, 300); //рисуем картинку в канвас
   

	c.beginPath();
	c.moveTo(0,ch/2);
	for(let x = 0; x < cw; x++){
		for(let y = 7; y < 20; y++){
			c.lineTo(x, y * 60 + ch/2 + Math.sin(x * frequency + increment2) * amplitude * Math.sin(w));
		}
	}
	c.stroke();
	c.strokeStyle = 'rgba(0,0,155, 0.5)';
    c.closePath();
    


	c.beginPath();
	c.moveTo(0,ch/2);
	for(let x = 0; x < cw; x++){
		for(let y = 8; y < 20; y++){
			c.lineTo(x, y * 60 + ch/2 + Math.sin(x * frequency + increment1) * amplitude * Math.sin(w));
		}
	}
	c.stroke();
	c.strokeStyle = 'rgba(0,0,155, 0.5)';
	c.closePath();

	increment1+= 0.05;
	increment2 -= 0.03;
    w+=0.05
    
    
}
animate();


addEventListener('resize', () => {
    canvas.height = canvasWraper.offsetHeight;
    canvas.width = canvasWraper.offsetWidth;
	ch = canvas.height;
	cw = canvas.width;
});