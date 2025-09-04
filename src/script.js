import { getProjects, addProject, initDefaultProject, removeProject } from "./modules/projectManager.js";
import { loadProjects, saveProjects } from "./modules/storage.js";
import { renderProjects } from "./modules/dom.js";
import Project from "./modules/project.js";
import ToDoItem from "./modules/todo.js";

loadProjects();         
initDefaultProject();   
renderProjects();       

const createNewProjectButton = document.getElementById("create-new-project-button");
const createNewProjectTitleInput = document.getElementById("create-new-project-title-input");

createNewProjectButton.addEventListener("click", () => {
    const projectTitle = createNewProjectTitleInput.value.trim();

    if (!projectTitle) {
        alert("Project title cannot be empty.");
        return;
    }

    const newProject = new Project(projectTitle);
    addProject(newProject);
    saveProjects(getProjects());

    createNewProjectTitleInput.value = "";
    renderProjects();
});
