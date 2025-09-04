export default class Project {
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
        this.toDoItems = [];
    }

    addToDo(toDoItem) {
        this.toDoItems.push(toDoItem);
    }

    removeToDo(index) {
        this.toDoItems.splice(index, 1);
    }
}

console.log("Loading project.js");

