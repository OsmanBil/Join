const userss = [
    {
        'name': 'Raphael Konopatzki',
        'mail': 'mail1@mail.de',
        'img': null
    },
    {
        'name': 'Osman Bilgin',
        'mail': 'mail2@mail.de',
        'img': null
    },
    {
        'name': 'Andreas Komor',
        'mail': 'mail3@mail.de',
        'img': null
    }
];

let usersAdded = [];


function addEditor(x) {
    if (x == 'a') {
        usersAdded.push(userss[0]);
    } else if (x == 'b') {
        usersAdded.push(userss[1]);
    } else if (x == 'c') {
        usersAdded.push(userss[2]);
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
    tasks = await JSON.parse(backend.getItem('tasks')) || [];



    task =
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
    backend.setItem('tasks', JSON.stringify(tasks));        //backend connection


    alert('Daten gespeichert.');


}


