const modalTaskButton = document.querySelectorAll('[data-modal-toggle="crud-modal"]') 
export const modalTask = document.getElementById('crud-modal')


modalTaskButton.forEach(btn => {
    btn.addEventListener('click',()=>{
        modalTask.classList.toggle('hidden')
    })    
});