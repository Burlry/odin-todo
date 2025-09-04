import { getProjects, removeProject } from './projectManager.js';
import { saveProjects } from './storage.js';
import { createToDoItem } from './toDoManager.js';
import { editToDoItem } from "./toDoManager.js";

const projectHolder = document.getElementById("project-holder");

function clearProjectHolder() {
    while (projectHolder.firstChild) {
        projectHolder.removeChild(projectHolder.firstChild);
    }
}

function renderProjects() {
    clearProjectHolder();
    const projects = getProjects();

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        const projectDiv = document.createElement("details");
        const projectSummary = document.createElement("summary");
        const toDoHolder = document.createElement("div");
        
        projectDiv.id = `project-div-${i + 1}`;
        projectSummary.id = `project-div-title-${i + 1}`;
        toDoHolder.id = `project-to-do-holder-${i + 1}`;

        projectHolder.appendChild(projectDiv);
        projectDiv.appendChild(projectSummary);
        projectDiv.appendChild(toDoHolder);

        projectSummary.textContent = project.projectTitle;  

        createDeleteButton(projectDiv, i);
        createAddToDoButton(i);
        renderToDoItems(i, toDoHolder);
    }
}

function createDeleteButton(parentDiv, index) {
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "X";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.marginLeft = "8px";
    deleteButton.style.color = "red";

    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this project?")) {
            removeProject(index);
            saveProjects(getProjects());
            parentDiv.remove();
            renderProjects();
        }
    });

    parentDiv.querySelector("summary").appendChild(deleteButton);
}

function createAddToDoButton(projectIndex) {
    const addToDoButton = document.createElement("button");
    addToDoButton.textContent = "Add To-Do";
    addToDoButton.style.marginTop = "5px";

    addToDoButton.addEventListener("click", () => {
        showToDoForm(projectIndex); 
    });

    const toDoHolder = document.getElementById(`project-to-do-holder-${projectIndex + 1}`);
    toDoHolder.appendChild(addToDoButton);
}

function showToDoForm(projectIndex) {
    const toDoHolder = document.getElementById(`project-to-do-holder-${projectIndex + 1}`);
    if (document.getElementById(`to-do-form-${projectIndex}`)) return;

    const form = document.createElement("form");
    form.id = `to-do-form-${projectIndex}`;
    form.style.marginTop = "10px";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "6px";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "To-Do Title";
    titleInput.maxLength = 50;
    titleInput.required = true;

    const descInput = document.createElement("textarea");
    descInput.placeholder = "Description";

    const prioritySelect = document.createElement("select");
    ["Low", "Medium", "High"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        prioritySelect.appendChild(option);
    });

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";

    const notesInput = document.createElement("textarea");
    notesInput.placeholder = "Notes";

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Add To-Do";

    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(prioritySelect);
    form.appendChild(dueDateInput);
    form.appendChild(notesInput);
    form.appendChild(submitBtn);

    toDoHolder.appendChild(form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const toDoTitle = titleInput.value.trim();
        const description = descInput.value.trim();
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;
        const notes = notesInput.value.trim();

        if (!toDoTitle) {
            alert("Title is required");
            return;
        }

        createToDoItem(projectIndex, toDoTitle, description, priority, dueDate, notes);
        form.remove();
    });
}

function renderToDoItems(projectIndex, toDoHolder) {
    const projects = getProjects();
    const toDos = projects[projectIndex].toDoItems;

    toDos.forEach((item, toDoIndex) => {
        const toDoDetails = document.createElement("details");
        toDoDetails.classList.add("to-do-item");

        const toDoSummary = document.createElement("summary");
        const title = document.createElement("span");
        title.textContent = item.toDoTitle;
        title.style.textDecoration = item.completed ? "line-through" : "none";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.style.marginRight = "8px";

        checkbox.addEventListener("change", () => {
            item.completed = checkbox.checked;
            title.style.textDecoration = item.completed ? "line-through" : "none";
            saveProjects(getProjects());
        });

        const priorityColor = {
            High: "red",
            Medium: "orange",
            Low: "green"
        };
        toDoDetails.style.borderLeft = `5px solid ${priorityColor[item.priority] || "gray"}`;
        toDoDetails.style.padding = "5px";
        toDoDetails.style.margin = "5px 0";

        toDoSummary.appendChild(checkbox);
        toDoSummary.appendChild(title);

        const contentDiv = document.createElement("div");

        const dueDate = document.createElement("p");
        dueDate.textContent = item.dueDate ? `Due: ${item.dueDate}` : "No due date";

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${item.priority}`;

        const description = document.createElement("p");
        description.textContent = `Description: ${item.description || "None"}`;

        const notes = document.createElement("p");
        notes.textContent = `Notes: ${item.notes || "None"}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginTop = "5px";

        deleteBtn.addEventListener("click", () => {
            if (confirm("Delete this to-do?")) {
                toDos.splice(toDoIndex, 1);
                saveProjects(getProjects());
                renderProjects();
            }
        });
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginTop = "5px";

        editBtn.addEventListener("click", () => {
            const form = document.createElement("form");
            form.style.display = "flex";
            form.style.flexDirection = "column";
            form.style.gap = "6px";
            form.style.marginTop = "5px";

            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = item.toDoTitle;

            const descInput = document.createElement("textarea");
            descInput.value = item.description;

            const prioritySelect = document.createElement("select");
            ["Low", "Medium", "High"].forEach(level => {
                const option = document.createElement("option");
                option.value = level;
                option.textContent = level;
                if (item.priority === level) option.selected = true;
                prioritySelect.appendChild(option);
            });

            const dueDateInput = document.createElement("input");
            dueDateInput.type = "date";
            dueDateInput.value = item.dueDate || "";

            const notesInput = document.createElement("textarea");
            notesInput.value = item.notes;

            const saveBtn = document.createElement("button");
            saveBtn.type = "submit";
            saveBtn.textContent = "Save";

            form.appendChild(titleInput);
            form.appendChild(descInput);
            form.appendChild(prioritySelect);
            form.appendChild(dueDateInput);
            form.appendChild(notesInput);
            form.appendChild(saveBtn);

            contentDiv.replaceWith(form);

            form.addEventListener("submit", (e) => {
                e.preventDefault();
                editToDoItem(projectIndex, toDoIndex, {
                    toDoTitle: titleInput.value.trim(),
                    description: descInput.value.trim(),
                    priority: prioritySelect.value,
                    dueDate: dueDateInput.value,
                    notes: notesInput.value.trim(),
                });
            });
        });

        contentDiv.appendChild(dueDate);
        contentDiv.appendChild(priority);
        contentDiv.appendChild(description);
        contentDiv.appendChild(notes);
        contentDiv.appendChild(deleteBtn);
        contentDiv.appendChild(editBtn);

        toDoDetails.appendChild(toDoSummary);
        toDoDetails.appendChild(contentDiv);
        toDoHolder.appendChild(toDoDetails);
    });
}





export {
    renderProjects,
    showToDoForm,
    renderToDoItems
};
