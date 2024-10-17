const texto = document.getElementById('texto');
const guardar = document.getElementById('guardar');
const eliminar = document.getElementById('eliminar');
const cambiarFuente = document.getElementById('cambiar-fuente');
const cambiarTamaño = document.getElementById('cambiar-tamaño');
const agregarImagen = document.getElementById('agregar-imagen');
const imagenContainer = document.getElementById('imagen-container');

guardar.addEventListener('click', () => {
    const archivo = new Blob([texto.value], { type: 'text/plain' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = 'nota.txt';
    enlace.click();
});

eliminar.addEventListener('click', () => {
    texto.value = '';
    imagenContainer.innerHTML = ''; // Eliminar imágenes al borrar la nota
});

cambiarFuente.addEventListener('click', () => {
    const fuente = prompt('Ingrese el nombre de la fuente:');
    texto.style.fontFamily = fuente;
});

cambiarTamaño.addEventListener('click', () => {
    const tamaño = prompt('Ingrese el tamaño de la fuente (en px):');
    texto.style.fontSize = tamaño + 'px';
});

agregarImagen.addEventListener('click', () => {
    const archivo = document.createElement('input');
    archivo.type = 'file';
    archivo.accept = 'image/*';
    archivo.onchange = () => {
        const imagen = archivo.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.createElement('img');
            img.src = reader.result;
            img.style.maxWidth = '100%';
            img.style.marginTop = '10px';
            imagenContainer.appendChild(img);
        };
        reader.readAsDataURL(imagen);
    };
    archivo.click();
});
;


