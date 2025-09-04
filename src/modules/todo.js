export default class ToDoItem {
    constructor(toDoTitle, description, priority, dueDate, notes) {
        this.toDoTitle = toDoTitle;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.notes = notes;
        this.completed = false;
    }
}
