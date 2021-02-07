document.addEventListener('DOMContentLoaded', () => {
let message = document.querySelector('.message'),
    btnCreate = document.querySelector('.btn-Add'),
    todo = document.querySelector('.list-massegers');

let toDoList = [];
if (localStorage.getItem('todo')) {

    toDoList = JSON.parse(localStorage.getItem('todo'))
    listMessages();
}

    
btnCreate.addEventListener('click', function (e) {
    //e.preventDefault();
    console.log(message.value);
   let createToDo = {
        todo: message.value,
        checked: false,
        important: false

    } 
    
    toDoList.push(createToDo);
    localStorage.setItem('todo', JSON.stringify(toDoList));
    listMessages();
    message.value = '';
      window.location.reload();
});

function listMessages() {
    let display = '';
    toDoList.forEach(function (item, i) {
        display += `
    <li>

<input type="checkbox" 
id='item_${i}' ${item.checked ?'checked':' '}>

<label for="item_${i}">${item.todo}</label>
             <div class="delete"></div>
</li>

`
        todo.innerHTML = display;
        
        
    })
  
}


todo.addEventListener('change', function (event) {
    let idList = event.target.getAttribute('id');
    let label = todo.querySelector('[for=' + idList + ']');
    let labelText = label.innerHTML;
    console.log('label:', labelText);
    toDoList.forEach(function (item) {
        if (item.todo === labelText) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(toDoList))
        }
    })

});

//delete
   
        
document.querySelectorAll('.delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
        console.log(i);
        btn.parentElement.remove();
       
       toDoList.splice(i, 1);
        console.log(toDoList);
        listMessages();
        localStorage.setItem('todo', JSON.stringify(toDoList));
   
         window.location.reload();
    });
});

    
});