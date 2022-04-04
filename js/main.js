/**
 * @author Osman Bilgin, Raphael Konopatzki, Andreas Komor
 * @description To generate such JS documentation by JSDoc in html format:
 * 1. open VSCode
 * 2. open terminal
 * 3. go to the subfolder of your js files
 * 4. type: jsdoc . (for all files) or jsdoc [filename]
 * JSDoc generates a html documentation in the subfolder /out
 */

/**
 * @typedef {object} task                   - stores a task
* @property {number} id                     - unique id of a task 
* @property {string} title                 - task title
 * @property {string} description           - task description
 * @property {string} status                - current task status
 * @property {Date} due_date                - deadline for implementation
 * @property {boolean} urgency              - classification if urgent
 * @property {Array.<string>} assigned_to   - whom is the task assigned to
 */

/**
 * @typedef {object} user                   - stores a user
 * @property {string} name                  - name user
 * @property {string} mail                  - mail address user
 * @property {string} img                   - image user (file path)
 */

/**
 * storage of all tasks
 * @type {Array.<task>}
 * @global
 */


/**
 * @global
 * @function setURL
 * @description - This function sets the link to backend storage
 */
setURL('http://gruppe-213.developerakademie.net/smallest_backend_ever');

/**
 * @global
 * @name tasks
 * @description - Storage for all tasks
 */
let tasks = [];

// /**
//  * @global
//  */
// let task = {
//     'title': null,
//     'description': null,
//     'status': null,
//     'due_date': null,
//     'urgency': null,
//     'assigned_to': []
// };

/**
 * stores possible status of a task
 * @type {Array.<string>}
 * @global
 */
const taskStatus = ['backlog', 'todo', 'progress', 'testing', 'done'];

function insertSampleData() {
    tasks = [
        {
            'id': 0,
            'title': 'Task 1',
            'description': 'Diese Task habe ich für Testzwecke angelegt.',
            'status': taskStatus[2],
            'due_date': new Date('December 17, 2022'),
            'urgency': false,
            'assigned_to': ['Andreas']
        },
        {
            'id': 1,
            'title': 'Task 2',
            'description': 'Diese dringende Task habe ich auch für Testzwecke angelegt.',
            'status': taskStatus[3],
            'due_date': new Date('May 12, 2022'),
            'urgency': true,
            'assigned_to': ['Andreas']
        }
    ]

    backend.setItem('tasks', tasks);    //store sample data
    alert('Daten im Backend mit dem key = "tasks" gespeichert.');

    loadTasks();
}


/**
 * stores users
 * @type {Array.<user>}
 * @global
 */
const users = [
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


/**
 * Functionality to run if index.html is opened 
 */
function init() {
    includeHTML();
    loadTasks();
}


/**
 * Loads stored tasks from backend server
 * @async
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = backend.getItem('tasks') || []; // fill local variable tasks with all stored tasks
}


/**
 * 
 * @returns {number} - Returns a new usable TaskID (e.g. for an new task)
 * @example task.id = getNewTaskID();
 */
function getNewTaskID() {
    const tmp = [];

    if (tasks.length === 0) {   //ID=1 if first task
        return 1;
    }

    for (const task of tasks) {
            if (task && Number.isInteger(task.id)) { //only if task exists and ID is a number
                tmp.push(Number(task.id));
            }
    }

    return Math.max(...tmp) + 1;
}


/**
 * Renders assignees of a task.
 * @param {Array.<string>} assigned_to   - assignees
 * @returns {string} - html code (icons) that represents the assignees. If there is no assignee, this function returns empty string.
 */
function renderAssignees(assigned_to) {
    let tmp = '';

    for (user of assigned_to) {
        tmp += /*html*/`
            <img class="img-assignee" src="${user.img}">
        `;
    }

    return tmp;
}

/**
 * - Displays a html element.
 * @param {string} elementID - The ID of html element to be displayed.
 */
function displayElement(elementID) {
    document.getElementById(elementID).classList.remove('d-none');
}


/**
 * - Hides a html element.
 * @param {string} elementID - The ID of html element to be hidden.
 */
function hideElement(elementID) {
    document.getElementById(elementID).classList.add('d-none');
}


/**
 * 
 * @param {string} status - Wanted task status
 * @returns {Array.<task>}  - Returns an array of tasks with the wanted status
 */
function filterTasksByStatus(status) {
    return tasks.filter(t => t.status === status);
}


/**
 * Extracts the ID of an ID of html element.
 * Preconditions: the ID of the html element (elementID) has to be in format: Name_ID  
 * @param {string} elementID - ID of a html element
 * @returns {number} - Returns the ID as a number.
 */
function getIndexFromElementID(elementID) {
    if (elementID) {
    let tmp = elementID.split('_');
    return +tmp[tmp.length - 1];
    } else {
        return;
    }
}


/**
 * - Gets a task from a ElementID (preconditions: element id has to be in format: name_id)
 * or from a TaskID 
 * @param {(string | number)} taskIDOrElementID - If string -> ID of a html element assumed,
 * if number -> ID of task assumed
 * @returns {task} - Returns a task with wanted ID
 */
function getTaskFromTaskID(taskIDOrElementID) {
    if (typeof taskIDOrElementID === 'string') {
        return tasks.filter(t => t.id === getIndexFromElementID(taskIDOrElementID))[0];
    } else if (typeof taskIDOrElementID === 'number') {
        return tasks.filter(t => t.id === taskIDOrElementID.toFixed())[0];
    }
}



/**
 * - Switches between views in one pager: iterates through all views, displays the wanted view and hides the rest.
 * - Preconditions: the view to be displayed has to have the class name "view".
 * @param {string} viewID - ElementID of the view to be displayed. 
 */
function openView(viewID) {
    let views = document.getElementsByClassName('view');

    for (const view of views) {
        if (view.id === viewID) {
            displayElement(view.id);
        } else {
            hideElement(view.id);
        }
    }
}