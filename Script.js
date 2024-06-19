function saveNote() {
    const input = document.getElementById('noteInput');
    const notesContainer = document.getElementById('notesContainer');
    if (input.value.trim() !== '') {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = input.value;
        noteDiv.className = 'note';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            notesContainer.removeChild(noteDiv);
        };
        
        noteDiv.appendChild(deleteBtn);
        notesContainer.appendChild(noteDiv);
        input.value = ''; 
    } else {
        alert('Please enter a note!');
    }
}
