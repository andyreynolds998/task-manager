//inv variable scope for homework
var important = false;
var serverUrl = "https://fsdiapi.azurewebsites.net/";


function init(){
    console.log("My task manager");

    $("#btnSave").click(saveTask);
    $("#important").click(importantButton);
}
//init function is good for two things. To load data, and to enable hook events early.
window.onload = init;

function importantButton(){
    if(!important){
        important = true;
        $("#important").removeClass("far").addClass("fas");
    }else{
        important = false;
        $("#important").removeClass("fas").addClass("far");
    }
}



function saveTask(){
    console.log("Task has been saved");
    //read values from controls
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let category = $("#selCategory").val();
    let location = $("#txtLocation").val();
    let duedate = $("#selDueDate").val();
    let color = $("#selColor").val();
    //create an object, console.log the object for homework
    let task = new Task(title, important, category, description, location, duedate, color);
    console.log(task);
    //send object to a backend server
    $.ajax({
        url: serverUrl + "api/tasks/",
        type: 'POST',
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res){
            console.log("Server says:", res)
        },
        error: function(eDetails){
            console.error("Error saving", eDetails);
        }
    });
    //display the task
    displayTask(task);
}

function displayTask(task){
    let syntax = 
    `<div class="task">
        <i class='important fas fa-star'></i> 
        <div class="description">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <label class="due-date">${task.duedate}</label>
        <label class="location">${task.location}</label>
    </div>`;

    $("#pendingList").append(syntax);
}

