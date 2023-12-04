const button = document.querySelector(".buttonAddTask");
const input = document.querySelector(".inputTask");
const fullList=document.querySelector(".listTasks");

let list = [];

function addTask() {
    const taskText = input.value.trim(); 

    if (taskText !== '') {
        list.push({
            task: taskText,
            complete: false
        });

        input.value = '';
        showTasks();
    }
    input.value = '';

    showTasks();
}

function showTasks() {

    list.sort((a, b) => a.complete - b.complete);
    
    let newLi = '';

    list.forEach((item, index) => {

        newLi = newLi + `  
        <li class="tasks ${item.complete && "done"}">
            <img src="./images/checked.png" alt="checked-img" onclick="completeTask(${index})" />
            <p>${item.task}</p>
            <img src="./images/trash.png" alt="trash-img" onclick="deleteItems(${index})"/>
        </li> 
        `    
    })
    
    fullList.innerHTML =  newLi;

    localStorage.setItem('list', JSON.stringify(list));

}

function completeTask(index){
    list[index].complete = !list[index].complete;

    showTasks();
}
function deleteItems(index){
    list.splice(index, 1);

    showTasks();
}

function reloadTasks(){
    const localStorageTasks = localStorage.getItem('list');

    if (localStorageTasks){
        list = JSON.parse(localStorageTasks);
    }

    showTasks();
}
reloadTasks();

button.addEventListener("click", addTask);