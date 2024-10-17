const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let currentColor = '#000000';
let brushSize = 5;
let actions = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
document.getElementById('colorPicker').addEventListener('input', (e) => {
    currentColor = e.target.value;
});
document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
});
document.getElementById('erase').addEventListener('click', () => {
    currentColor = '#f0f0f0'; // Color del fondo
});
document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('undo').addEventListener('click', undoLastAction);

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function stopDrawing() {
    if (!drawing) return;
    drawing = false;
    ctx.closePath();
    actions.push(canvas.toDataURL());
}

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actions.push(canvas.toDataURL()); // Guardar acción para deshacer
}

function undoLastAction() {
    if (actions.length > 0) {
        const lastAction = actions.pop();
        const img = new Image();
        img.src = lastAction;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
