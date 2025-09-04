import Project from './project.js';
import ToDoItem from './todo.js';
import { addProject } from './projectManager';

const STORAGE_KEY = 'todoAppProjects';

function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const rawProjects = JSON.parse(data);
    rawProjects.forEach(projectData => {
        const project = new Project(projectData.projectTitle);
        projectData.toDoItems.forEach(item => {
            const todo = new ToDoItem(item.toDoTitle, item.description, item.priority, item.dueDate, item.notes);
            todo.completed = item.completed;
            project.addToDo(todo);
        });
        addProject(project);
    });
    
}

export { saveProjects, loadProjects };