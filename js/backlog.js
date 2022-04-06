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
                <button type="button" class="btn btn-danger btn-sm my-1" onclick="deleteTask(${task.id})">Discard</button>
                <button type="button" class="btn btn-success btn-sm my-1" onclick="keepTask(${task.id})">Keep</button>
            </td>
            <td class="assignees">
                ${renderAssignees(task.assigned_to)}
            </td>
            <td class="category">
            ${task.category}
            </td>
            <td class="details">
            ${task.description}
            </td>
        </tr>
    `;
}


/**
 * Deletes a task
 * @param {number} ID - The ID of the task to be deleted
 */
function deleteTask(ID) {
    tasks.splice(tasks.indexOf(getTaskFromTaskID(ID)), 1);

    showTasksOnBacklog();
}

/**
 * Moves a task to the status 'todo'
 * @param {number} ID - The ID of the task to be moved to next status
 */
function keepTask(ID) {
    getTaskFromTaskID(ID)['status'] = taskStatus[1];   // move task to status 'todo'
    
    showTasksOnBacklog();
}