/**
 * Opens the backlog section
 */
function openBacklog() {
    showTasksOnBacklog();
    openView('backlog');
}


/**
 * Show all created tasks on backlog
 */
function showTasksOnBacklog() {
    let backlogSection = document.getElementById('task-logs-content');
    let tmp = '';
    backlogSection.innerHTML = '';

    for (const task of filterTasksByStatus(taskStatus[0])) {//iterates through all tasks with status 'backlog'
        tmp += renderTaskLog(task);
    }

    if (tmp === '') {
        tmp = '<tr><td class="td-message" colspan="4">There are no tasks in backlog.</td></tr>';
    }

    backlogSection.innerHTML = tmp; // fill content to board-section
}


/**
 * Renders tasks for backlog
 * @param {task} task - a task   
 * @returns {string} - html code that represents a task (for backlog)
 */
function renderTaskLog(task) {
    return /*html*/`
       <tr id="task-log_${task.id}" class="task-log">
            <td class="action">
                <button type="button" class="btn btn-danger btn-sm my-1" onclick="deteleTaskLog(${task.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="delete this task">Discard</button>
                <button type="button" class="btn btn-success btn-sm my-1" onclick="keepTask(${task.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="This task will be kept and moved to board (todo section).">Keep</button>
            </td>
            <td class="assignees">
                ${renderAssignees(task.assigned_to)}
            </td>
            <td class="category">
            ${task.category}
            </td>
            <td class="details" data-bs-toggle="tooltip" data-bs-placement="top" title="${task.title}">
            ${task.description}
            </td>
        </tr>
    `;
}


/**
 * Deletes task directly on backlog.
 * @param {number} ID - The ID of the Task to be deleted.
 */
function deteleTaskLog(ID) {
    deleteTask(ID);
    showTasksOnBacklog();
}


/**
 * Moves a task to the status 'todo'
 * @param {number} ID - The ID of the task to be moved to next status
 */
function keepTask(ID) {
    getTaskFromTaskID(ID)['status'] = taskStatus[1];   // move task to status 'todo'
    synchronizeData();
    showTasksOnBacklog();
}