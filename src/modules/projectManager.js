import Project from './project.js';

console.log("typeof Project:", typeof Project);
console.log("Project value:", Project);

const projectList = [];

function getProjects() {
    return projectList;
}

function getProject(index) {
    return projectList[index];
}

function addProject(project) {
    projectList.push(project);
}

function removeProject(index) {
    projectList.splice(index, 1);
}

function initDefaultProject() {
    if (projectList.length === 0) {
        projectList.push(new Project("General"));
    }
}

console.log("Project class:", Project);

export {
    getProjects,
    getProject,
    addProject,
    removeProject,
    initDefaultProject
};