
let usersAdded = [];


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
}

function disableProfile(x) {
    let profile = document.getElementById(`dropdown${x}`);
    profile.classList.add('disable');
}



async function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category');
    let categoryText = category.options[category.selectedIndex].text;
    let date = document.getElementById('startDate').value;
    let urgency = document.getElementById('urgency');
    let urgencyText = urgency.options[urgency.selectedIndex].text;

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



}


function cancel(){
    title = document.getElementById('title').value = ("");
    description = document.getElementById('description').value = ("");
    category = document.getElementById('category').value = 0;
    


}