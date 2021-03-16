function onDragStart(e) {
    console.log(e.target.id);
    
    e.dataTransfer.setData('text/plain', e.target.id);
    e.currentTarget.style.backgroundColor = 'yellow';
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target;
    
    dropzone.appendChild(draggableElement);
    e.dataTransfer.clearData();
}