const inputTask = document.getElementById("input-text");
const inputDate = document.getElementById("input-date");
const listContainer = document.getElementById("task-list");
const filterSelect = document.getElementById("filter");

// make the task showing at the list container with add button
function addTask() {
    // comparing for the both value text & date
    if (inputTask.value === "" || inputDate.value === "") {
        alert("You must add task & date first!!");
    } 
    
    // if value is not 0 then this will running
    else {
        const emptyMessage = listContainer.querySelector("p");
        if (emptyMessage) {
            emptyMessage.remove();
        }
        let li = document.createElement("li");
        li.innerHTML = `${inputTask.value}
            <span style="color:#9ca3af; font-size:13px; margin-left:10px;">
            (${inputDate.value}) </span> `;
        listContainer.appendChild(li);
        let newStrong = document.createElement("strong");
        newStrong.innerHTML = "\u00d7";
        li.appendChild(newStrong);
    }
    // set the default input form to blank
    inputTask.value = "";
    inputDate.value = "";
    // saving data
    saveData()
};

// make the dropdown for the filter select
filterSelect.addEventListener("change", function(){
    const tasks = listContainer.querySelectorAll("li");

    tasks.forEach(task =>{
        switch (filterSelect.value){
            case "all":
                task.style.display = "flex";
                break;
            
            case "completed":
                if (task.classList.contains("checked")){
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                } break;

            case "uncompleted":
                if (!task.classList.contains("checked")){
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                } break;
        }
    });
});

// set the delete all button to be working
function deleteAll(){
    listContainer.querySelectorAll("li").forEach(li => li.remove());

    let p = document.createElement("p");
    p.textContent = "No task available..."
    listContainer.appendChild(p);

    // save the data when it's cleared
    saveData()
}

// check or uncheck the task from the listContainer
listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        // saving data
        saveData()
    }
    else if (e.target.tagName === "STRONG"){
        e.target.parentElement.remove();

        // makes the "no task available" text visible when there's no li items
        if (listContainer.querySelectorAll("li").length === 0){
            let p = document.createElement("p");
            p.textContent = "No task available...";
            listContainer.appendChild(p);
        } 
        
        // saving data
        saveData()
    }
}, false);

// initial the saveData function to be stored at the local storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// make the browser to load the last saved data
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask()