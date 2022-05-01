
let usersAdded = [];
let counter = 0;

function addEditor(x) {
    if (x == 'a') {
        usersAdded.push(users[0]);
    } else if (x == 'b') {
        usersAdded.push(users[1]);
    } else if (x == 'c') {
        usersAdded.push(users[2]);
    }

    document.getElementById('profile').innerHTML += `
    <img src="./img/${x}.png">`;


 
counter++;
if(counter == 3)
{
   
    let plusBtn = document.getElementById('plusBtn').classList.add('d-none');

}
}

function disableProfile(x) {
    let profile = document.getElementById(`dropdown${x}`);
    profile.classList.add('disable');
}

function delEditor(){
    usersAdded.splice(0, usersAdded.length);

    let profilea = document.getElementById(`dropdowna`);
    profilea.classList.remove('disable');

    let profileb = document.getElementById(`dropdownb`);
    profileb.classList.remove('disable');

    let profilec = document.getElementById(`dropdownc`);
    profilec.classList.remove('disable');

    document.getElementById('profile').innerHTML =` `;

    counter = 0;
    let plusBtn = document.getElementById('plusBtn').classList.remove('d-none');

}

async function addTask() {



    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category');
    let categoryText = category.options[category.selectedIndex].text;
    let date = document.getElementById('startDate').value;
    let urgency = document.getElementById('urgency');
    let urgencyText = urgency.options[urgency.selectedIndex].text;

    //if (title == null || "Title...") {
    //    alert("empty");
    //  }else{
    //  }
      

    await downloadFromServer();
    tasks = backend.getItem('tasks') || [];

    let task =
    {
        'id': getNewTaskID(),
        'title': title,
        'description': description,
        'category': categoryText,
        'status': taskStatus[0],
        'due_date': date,
        'urgency': urgencyText,
        'assigned_to': usersAdded
    };



    tasks.push(task);
    backend.setItem('tasks', tasks);        //backend connection
    synchronizeData();


    cancel();

}


function cancel(){
    title = document.getElementById('title').value = ("");
    description = document.getElementById('description').value = ("");
    category = document.getElementById('category').value = 0;
    urgency = document.getElementById('urgency').value = 0;
    date = document.getElementById('startDate').value = ("");
    delEditor();


}