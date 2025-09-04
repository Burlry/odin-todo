import { getProjects } from "./projectManager.js";
import { saveProjects } from "./storage.js";
import { renderProjects } from "./dom.js";
import ToDoItem from "./todo.js";

function createToDoItem(projectIndex, toDoTitle, description, priority, dueDate, notes) {
    const projects = getProjects();
    const newToDo = new ToDoItem(toDoTitle, description, priority, dueDate, notes);

    projects[projectIndex].toDoItems.push(newToDo);
    saveProjects(projects);
    renderProjects();
}

function editToDoItem(projectIndex, toDoIndex, updates) {
    const projects = getProjects();
    const item = projects[projectIndex].toDoItems[toDoIndex]

    if (!item) return;

    if (updates.toDoTitle !== undefined) item.toDoTitle = updates.toDoTitle;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.priority !== undefined) item.priority = updates.priority;
    if (updates.dueDate !== undefined) item.dueDate = updates.dueDate;
    if (updates.notes !== undefined) item.notes = updates.notes;

    saveProjects(projects);
    renderProjects();
}

export { createToDoItem };
export { editToDoItem };

