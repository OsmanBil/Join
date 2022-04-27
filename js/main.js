/**
 * @author Osman Bilgin, Andreas Komor
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
* @property {string} title                  - task title
 * @property {string} description           - task description
 * @property {string} status                - current task status
 * @property {string} due_date              - deadline for implementation
 * @property {string} category      - the category the task has to be classified
 * @property {string} urgency       - classification of urgency (values can be retrieved by the global array 'urgencies')
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


// /**
//  * @global
//  * @function setURL
//  * @description - This function sets the link to backend storage
//  */
// setURL('http://gruppe-213.developerakademie.net/smallest_backend_ever');

/**
 * @global
 * @name tasks
 * @description - Storage for all tasks
 */
let tasks = [];


/**
 * @global
 * @type {task}
 * @name currentTask
 * @description - curent selected task
 */
let currentTask = {};

/**
 * stores possible status of a task
 * @type {Array.<string>}
 * @global
 */
const taskStatus = ['backlog', 'todo', 'progress', 'testing', 'done'];


/**
 * stores possible urgencies of a task
 * @type {Array.<string>}
 * @global
 */
 const urgencies = ['Low', 'Middle', 'High'];


/**
 * stores possible categories of a task
 * @type {Array.<string>}
 * @global
 */
 const categories = ['Marketing', 'Product', 'Sale'];


/**
 * stores users
 * @type {Array.<user>}
 * @global
 */
const users = [
    {
        'name': 'Batman',
        'mail': 'batman@mail.de',
        'img': 'img/a.png'
    },
    {
        'name': 'Grinch',
        'mail': 'grinch@mail.de',
        'img': 'img/b.png'
    },
    {
        'name': 'Spider Man',
        'mail': 'spider@mail.de',
        'img': 'img/c.png'
    }
];


/**
 * Functionality to run if index.html is opened 
 */
function init() {
    loadTasks();
    includeHTML();
    setTimeout(openBoard, 200);    //default view is board
}


/**
 * Loads stored tasks from backend server
 * @async
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = backend.getItem('tasks') || []; // fill local variable tasks with all stored tasks
    countTasks();   //displays number of board and backlog tasks in nav bar
}


// /**
//  * 
//  * @returns {number} - Returns a new usable TaskID (e.g. for an new task)
//  * @example task.id = getNewTaskID();
//  */
// function getNewTaskID() {
//     const tmp = [];

//     if (tasks.length === 0) {   //ID=1 if first task
//         return 1;
//     }

//     for (const task of tasks) {
//             if (task && Number.isInteger(task.id)) { //only if task exists and ID is a number
//                 tmp.push(Number(task.id));
//             }
//     }

//     return Math.max(...tmp) + 1;
// }


/**
 * 
 * @returns {number} - Returns a new usable TaskID (e.g. for an new task)
 * @example task.id = getNewTaskID();
 */
 function getNewTaskID() {
    let tmp = 0;
    let ID;

    for (const task of tasks) {
            if (task && Number.isInteger(task.id)) { //only if task exists and ID is a number
                ID = Number(task.id);
                if (tmp < ID) {
                    tmp = ID;
                }
            }
    }

    return (tmp > 0) ? tmp + 1 : 1;
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
            <img class="img-assignee" src="${user.img}" alt="${user.name}" data-bs-toggle="tooltip" data-bs-placement="top" title="${user.name + ' (' + user.mail})">
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
        return tasks.filter(t => t.id === +taskIDOrElementID.toFixed())[0];
    }
}



/**
 * - Switches between views in one pager: iterates through all views, displays the wanted view and hides the rest.
 * - Preconditions: the view to be displayed has to have the class name "view".
 * @param {string} viewID - ElementID of the view to be displayed. 
 */
function openView(viewID) {
    let views = document.getElementsByClassName('view');

    document.getElementById('view-name').innerHTML = viewID.toUpperCase();    //set title
    setLinkActive(viewID);  // set active link

    for (const view of views) {
        if (view.id === viewID) {
            displayElement(view.id);
        } else {
            hideElement(view.id);
        }
    }
}


/**
 * - Emphasizes the side bar link of the current view  
 * @param {string} viewID - ElementID of the view to be displayed.
 */
function setLinkActive(viewID) {
    for (let link of document.getElementsByClassName('nav-link')) {
        if (link.id.toLowerCase().indexOf('-' + viewID.toLowerCase()) > -1) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    }
}


/**
 * Synchronizes local data with backend data
 */
async function synchronizeData() {
    await backend.setItem('tasks', tasks);
    countTasks();
}


/**
 * Deletes a task
 * @param {number} ID - The ID of the task to be deleted
 */
 function deleteTask(ID) {
    tasks.splice(tasks.indexOf(getTaskFromTaskID(ID)), 1);
    synchronizeData();
}


function openHelp() {
    openView('help');
}

function openAddTask() {
    openView('addTask');
}


/**
 * Counts and displays number of backlog and board tasks in nav bar
 */
function countTasks() {
    const cTasks = tasks.length;
    const cBacklog = filterTasksByStatus(taskStatus[0]).length;
    const cBoard = cTasks - cBacklog;

    document.getElementById('count-board').innerHTML = (cBoard != 0) ? cBoard : ''; // displays number of board tasks
    document.getElementById('count-backlog').innerHTML = (cBacklog != 0) ? cBacklog : ''; //displays number of backlog tasks
}