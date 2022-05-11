let usersAdded = [];
let counter = 0;

/**
 * Function to add editor to task
 */
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
    if (counter == 3) {
        let plusBtn = document.getElementById('plusBtn').classList.add('d-none');
    }
}

/**
 * Function to disable editor profile
 */
function disableProfile(x) {
    let profile = document.getElementById(`dropdown${x}`);
    profile.classList.add('disable');
}

/**
 * Function to del editor
 */
function delEditor() {
    usersAdded.splice(0, usersAdded.length);

    let profilea = document.getElementById(`dropdowna`);
    profilea.classList.remove('disable');

    let profileb = document.getElementById(`dropdownb`);
    profileb.classList.remove('disable');

    let profilec = document.getElementById(`dropdownc`);
    profilec.classList.remove('disable');

    document.getElementById('profile').innerHTML = ` `;

    counter = 0;
    let plusBtn = document.getElementById('plusBtn').classList.remove('d-none');
}

/**
 * Function to add a task
 */
function addTask(ev) {
    ev.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category');
    let categoryText = category.options[category.selectedIndex].text;
    let date = document.getElementById('startDate').value;
    let urgency = document.getElementById('urgency');
    let urgencyText = urgency.options[urgency.selectedIndex].text;

    let task =
    {
        'id': getNewTaskID(),
        'title': title,
        'description': description || '',
        'category': categoryText,
        'status': taskStatus[0],
        'due_date': date,
        'urgency': urgencyText,
        'assigned_to': [].concat(usersAdded)
    };

    tasks.push(task);
    localStorage.setItem('newTaskID', task.id);
    
    synchronizeData();
    cancel();

    showMessage(3000, task.id);
}


/**
 * Function to cancel formular
 */
function cancel() {
    title = document.getElementById('title').value = "";
    description = document.getElementById('description').value = "";
    category = document.getElementById('category').value = 1;
    urgency = document.getElementById('urgency').value = 3;
    date = document.getElementById('startDate').value = "";
    delEditor();
}


/**
 * Shows an user message if a task could be added/modified.
 * @param {number} interval - An interval in ms how long to show user message.
 */
 function showMessage(delay, taskID) {
    document.getElementById('TaskID').innerHTML = taskID;
    displayElement('message-frame');

    setTimeout(() => {
        hideElement('message-frame');
    }, delay);
}