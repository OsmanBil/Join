/**
 * Opens the kanban board section
 */
function openBoard() {
    resetAddTaskForm(); // reset action button in add task form
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
            tmp += renderTaskCard(task, 13, 40);
        }

        boardSection.innerHTML = tmp; // fill content to board-section
    }
}


/**
 * Renders one task as a card.
 * The urgency of a task determines its color on board (higher urgency -> darker shade).
 * @param {task} task                   - a task  
 * @param {number} limitTitle           - limit (how many characters to show) in case of cut off title
 * @param {number} limitDescription     - limit (how many characters to show) in case of cut off description  
 * @returns {string} - html code that represents a task card (e.g. for the board)
 */
function renderTaskCard(task, limitTitle, limitDescription) {
    return /*html*/`
        <div id="task_${task.id}" class="task-card${setUrgencyColor(task)}" draggable="true" ondragstart="drag(event)">
            <div>
            <img class="img-edit point" src="img/edit.svg" alt="edit task" onclick="editTaskOnBoard(${task.id})" data-bs-toggle="tooltip" data-bs-placement="right" title="edit this task">
            <img class="img-delete point" src="img/delete.png" alt="delete task" onclick="deleteTaskOnBoard(${task.id})" data-bs-toggle="tooltip" data-bs-placement="right" title="delete this task">
            </div>
            <p id="title_${task.id}" class="title" data-bs-toggle="tooltip" data-bs-placement="top" title="${task.title}">${(limitTitle) ? task.title.substring(0, limitTitle) + '...' : task.title}</p>
            <p id="desc_${task.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="${task.description}">${(limitDescription) ? task.description.substring(0, limitDescription) + '...' : task.description}</p>
            <div id="assigned_${task.id}" class="assigned">${renderAssignees(task.assigned_to)}</div>
        </div>
    `;
}


/**
 * Determines which color a task on board should have dependent on the task urgency.
 * @param {task} task - Current task to be colored.
 * @returns {string} - Returns the particular css class to color a task on board.
 */
function setUrgencyColor(task) {
    switch (task.urgency) {
        case urgencies[0]:
            return ' urgent-low'
        case urgencies[1]:
            return ' urgent-middle'
        case urgencies[2]:
            return ' urgent-high'
        default:
            return '';
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}


function dragenter(ev) {
    let targetElement = document.getElementById(ev.currentTarget.id);
    targetElement.classList.add('emp-status');
}


function dragleave(ev) {
    let targetElement = document.getElementById(ev.currentTarget.id);
    targetElement.classList.remove('emp-status');
}


function drop(ev) {
    ev.preventDefault();
    const elementIDTarget = ev.currentTarget.id;
    const targetElement = document.getElementById(elementIDTarget);

    if (elementIDTarget.indexOf('section_') > -1 || elementIDTarget === 'link-backlog_0') {
        const elementIDSource = ev.dataTransfer.getData('text');

        getTaskFromTaskID(elementIDSource)['status'] = taskStatus[getIndexFromElementID(elementIDTarget)];
        synchronizeData();
        showTasksOnBoard();
    }

    targetElement.classList.remove('emp-status');
}


/**
 * Deletes task directly on board.
 * @param {number} ID - The ID of the Task to be deleted.
 */
function deleteTaskOnBoard(ID) {
    deleteTask(ID);
    showTasksOnBoard();
}


/**
 * Uses the add task form to edit tasks on kanban board.
 * @param {number} ID - The ID of the Task to be edited. 
 */
function editTaskOnBoard(ID) {
    currentTask = getTaskFromTaskID(ID); //get task
    const btnAction = document.getElementById('btn-action');    //reference to action button
    const btnCancel = document.getElementById('btn-cancel');    //reference to cancel button
    const title = 'Update Task';

    //initialize task data
    initTaskFields();

    btnAction.innerHTML = title;    //update action button
    btnAction.onclick = updateTask; // assign new click event for action button
    btnCancel.onclick = openBoard;  // assign new click event for cancel button

    openAddTask(title);  // opens manipulated add task view
}


/**
 * Initialization of add task form.
 * @param {task} task - The task whose data is initialized.
 */
function initTaskFields() {
    document.getElementById('title').value = currentTask.title;
    document.getElementById('startDate').value = currentTask.due_date; //.toISOString().split('T')[0];
    setDropdownByText('category', currentTask.category);
    setDropdownByText('urgency', currentTask.urgency);
    document.getElementById('description').value = currentTask.description;
}


/**
 * Updates an existing Task.
 * @param {number} ID - The ID of task to be updated. 
 */
function updateTask(ID) {
    tasks[tasks.indexOf(currentTask)] = generateTask(); // update task
    currentTask = undefined;    // empty currentTask
    synchronizeData();  // refresh data in storage
    resetAddTaskForm();
    openBoard();    // back to kanban board
}


/**
 * resets action button and input fields in add task form
 */
function resetAddTaskForm() {
    const btnAction = document.getElementById('btn-action');    //reference to action button
    btnAction.innerHTML = 'Create Task';
    cancel();
}


/**
 * Generates a task that consists of current entries in add task form
 * @returns {task} - Task that consists of current entries in add task form
 */
function generateTask() {
    const category = document.getElementById('category');
    const urgency = document.getElementById('urgency');

    return {
        'id': currentTask.id,
        'title': document.getElementById('title').value,
        'description': document.getElementById('description').value,
        'category': category.options[category.selectedIndex].text,
        'status': currentTask.status,
        'due_date': document.getElementById('startDate').value,
        'urgency': urgency.options[urgency.selectedIndex].text,
        'assigned_to': currentTask.assigned_to
    };
}


/**
 * Sets an option of a select element.
 * @param {string} elementID - Element ID of the dropdown element (select). 
 * @param {string} text - The text of the option to be selected.
 * @returns {void}
 */
function setDropdownByText(elementID, text) {
    let ddl = document.getElementById(elementID);

    for (const option of Array.from(ddl.options)) {
        if (option.text == text) {
            option.selected = true;
            return;
        }
    }
}