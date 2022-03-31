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
    let i = -1;
    //iterates through all tasks
    for (const task of tasks) {

        renderTask(i++, task.title, task.description, task.status, task.due_date, task.urgency, task.assigned_to);
        
    }

}


/**
 * @todo complete function
 * renders one task
 * @param {*} idx           - Index of current task  
 * @param {*} title         - task title 
 * @param {*} description   - task description
 * @param {*} status        - task status
 * @param {*} due_date      
 * @param {*} urgency 
 * @param {*} assigned_to 
 * @returns 
 */
function renderTask(idx, title, description, status, due_date, urgency, assigned_to) {
    return /*html*/`
        <div id="task_${idx}" class="task-card">
                    
                </div>
    `;
}
