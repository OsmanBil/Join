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

/**
 * @global
 */
let task = {
    'title': null,
    'description': null,
    'status': null,
    'due_date': null,
    'urgency': null,
    'assigned_to': []
};

/**
 * stores possible status of a task
 * @type {Array.<string>}
 * @global
 */
const status = ['backlog', 'todo', 'progress', 'testing', 'done'];


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
 * Loads stored tasks from backend server
 * @async
 */
async function loadTasks() {

}


/**
 * @todo complete function
 * Renders all tasks
 */
function renderTasks() {
    let i = 0;
    //iterates through all tasks
    for (const task of tasks) {
        renderTaskCard(i++, task.title, task.description, task.status, task.due_date, task.urgency, task.assigned_to);
    }

}


/**
 * renders one task as a card
 * @param {number} idx                  - Index of current task  
 * @param {string} title                - task title 
 * @param {string} description          - task description
 * @param {boolean} urgency             - task urgency
 * @param {Array.<user>} assigned_to    - assignees
 * @param {number} limitTitle           - limit (how many characters to show) in case of cut off title
 * @param {number} limitDescription     - limit (how many characters to show) in case of cut off description  
 * @returns {string} - html code that represents a task card (e.g. for the board)
 */
function renderTaskCard(idx, title, description, urgency, assigned_to, limitTitle, limitDescription) {
    return /*html*/`
        <div id="task_${idx}" class="task-card${(urgency) ? ' urgent' : ''}" draggable="true">
            <p id="title_${idx}" class="title">${(limitTitle) ? title.substring(0, limitTitle) : title}</p>
            <p id="desc_${idx}">${(limitDescription) ? description.substring(0, limitDescription) : description}</p>
            <div id="assigned_${idx}" class="assigned">${renderAssignees(assigned_to)}</div>
        </div>
    `;
}


/**
 * Renders assignees of a task.
 * @param {*} assigned_to   - assignees
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
 * Opens the kanban board section
 */
function openBoard() {
    displayElement('board');
}