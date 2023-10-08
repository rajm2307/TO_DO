const form = document.getElementById("new-text-form")
const input = document.getElementById("new-text-input")
const todoUL = document.getElementById("todos")
const addbtn = document.getElementById("addinput")
const del_all_btn = document.getElementById("delall")
const Alltodos = JSON.parse(localStorage.getItem("todos"))

if (Alltodos) {
    Alltodos.forEach(alltodo => {
        addTodo(alltodo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})


addbtn.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})


addbtn.addEventListener("click", () => {
    if (input.value == '') {
        alert(" You have to write something!")
    }
})



////ADDING TASK AND CREATING ELEMENTS


function addTodo(todo) {
    let todoText = input.value


    if (todo) {
        todoText = todo.text
    }

    if (todoText) {

        const list_container = document.createElement('div')
        list_container.classList.add('list_container')

        const todoEl = document.createElement('li')
        todoEl.classList.add("text-list")
        
        if (todo && todo.checked) {
            todoEl.classList.add('checked')
        }

        const inputEL = document.createElement('input')
        inputEL.classList.add('inputEL')
        inputEL.type = 'text';
        inputEL.value = todoText
        inputEL.setAttribute("readonly", "readonly");

        todoEl.appendChild(inputEL)

        const edit_delete_container = document.createElement('div')
        edit_delete_container.classList.add('edit_delete_container')

        const edit_button = document.createElement('button')
        edit_button.classList.add('edit_button')
        edit_button.innerText = "EDIT"
        const delete_button = document.createElement('button')
        delete_button.classList.add('delete_button')
        delete_button.innerText = "DELETE"

        edit_delete_container.appendChild(edit_button)
        edit_delete_container.appendChild(delete_button)

        list_container.appendChild(todoEl)
        list_container.appendChild(edit_delete_container)

        edit_button.addEventListener("click", () => {
            if (edit_button.innerText === "EDIT") {
                edit_button.innerText = "SAVE";
                inputEL.removeAttribute("readonly");
                inputEL.focus();
            }

            else {
                edit_button.innerText = "EDIT";
                inputEL.setAttribute("readonly", "readonly");
                updateLocalStorage()
            }
        });

        delete_button.addEventListener('click', (e) => {
            todoUL.removeChild(list_container);
            updateLocalStorage()
        });

        del_all_btn.addEventListener('click', () => {
            todoUL.removeChild(list_container);
            updateLocalStorage()
        })



        todoUL.appendChild(list_container)

        input.value = ''



        updateLocalStorage()

    }


}

const list = document.querySelectorAll('li.text-list');

list.forEach(function (li) {
    li.addEventListener('click', function () {
        li.classList.toggle('checked');
        updateLocalStorage()
    });
});



function updateLocalStorage() {

    let todosEl = document.querySelectorAll('.inputEL')

    const todos = []

    todosEl.forEach(elements_EL => {
        todos.push({ text: elements_EL.value, 
        checked: elements_EL.parentElement.classList.contains('checked') })
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}










