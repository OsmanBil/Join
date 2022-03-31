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
 * Renders all tasks
 */
function renderTasks() {

}
