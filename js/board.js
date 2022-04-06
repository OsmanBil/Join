/**
 * Opens the kanban board section
 */
function openBoard() {
    showTasksOnBoard();
    openView('board');
}


/**
 * Show all tasks on kanban board
 */
function showTasksOnBoard() {
    let boardSection;

    for (let i = 1; i < taskStatus.length; i++) {   // iterates through affected task status
        let tmp = '';
        boardSection = document.getElementById('status_' + i);  //affected board section
        boardSection.innerHTML = '';    //delete old content

        for (const task of filterTasksByStatus(taskStatus[i])) {//iterates through all tasks of current status
            tmp += renderTaskCard(task, 20, 40);
        }

        boardSection.innerHTML = tmp; // fill content to board-section
    }
}


/**
 * renders one task as a card
 * @param {task} task                   - a task  
 * @param {number} limitTitle           - limit (how many characters to show) in case of cut off title
 * @param {number} limitDescription     - limit (how many characters to show) in case of cut off description  
 * @returns {string} - html code that represents a task card (e.g. for the board)
 */
function renderTaskCard(task, limitTitle, limitDescription) {
    return /*html*/`
        <div id="task_${task.id}" class="task-card${(task.urgency) ? ' urgent' : ''}" draggable="true" ondragstart="drag(event)">
            <img class="img-delete point" src="img/delete.png" alt="delete task" onclick="deleteTaskOnBoard(${task.id})" data-bs-toggle="tooltip" data-bs-placement="right" title="delete this task">
            <p id="title_${task.id}" class="title" data-bs-toggle="tooltip" data-bs-placement="top" title="${task.title}">${(limitTitle) ? task.title.substring(0, limitTitle) + '...' : task.title}</p>
            <p id="desc_${task.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="${task.description}">${(limitDescription) ? task.description.substring(0, limitDescription) + '...' : task.description}</p>
            <div id="assigned_${task.id}" class="assigned">${renderAssignees(task.assigned_to)}</div>
        </div>
    `;
}


function allowDrop(ev) {
    ev.preventDefault();   
}


function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    console.log(ev.target.id);
}


function dragenter(ev) {
    let targetElement = document.getElementById(ev.target.id);
    targetElement.classList.add('emp-status');
    console.log('dragenter');
}


function dragleave(ev) {
    let targetElement = document.getElementById(ev.target.id);
    targetElement.classList.remove('emp-status');
    console.log('dragleave');
}


function drop(ev) {
    ev.preventDefault();
    const elementIDSource = ev.dataTransfer.getData('text');
    const elementIDTarget = ev.target.id;

    let targetElement = document.getElementById(elementIDTarget);

    getTaskFromTaskID(elementIDSource)['status'] = taskStatus[getIndexFromElementID(elementIDTarget)];
    //tasks[getIndexFromElementID(elementIDSource)]['status'] = taskStatus[getIndexFromElementID(elementIDTarget)];
    targetElement.classList.remove('emp-status');

    showTasksOnBoard();
}


/**
 * Deletes task directly on board.
 * @param {number} ID - The ID of the Task to be deleted.
 */
function deleteTaskOnBoard(ID) {
    deleteTask(ID);

    showTasksOnBoard();
}