/**
 * Opens the kanban board section
 */
function openBoard() {
    showTasksOnBoard();
    displayElement('board');
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
            <p id="title_${task.id}" class="title">${(limitTitle) ? task.title.substring(0, limitTitle) + '...' : task.title}</p>
            <p id="desc_${task.id}">${(limitDescription) ? task.description.substring(0, limitDescription) + '...' : task.description}</p>
            <div id="assigned_${task.id}" class="assigned">${renderAssignees(task.assigned_to)}</div>
        </div>
    `;
}


function allowDrop(ev) {
    ev.preventDefault();

    let targetElement = document.getElementById(ev.target.id);
    targetElement.classList.add('border-solid');
}


function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    let sourceElement = document.getElementById(ev.dataTransfer.getData('text'));
    let targetElement = document.getElementById(ev.target.id);

    targetElement.appendChild(sourceElement);
    targetElement.classList.remove('border-solid');
}