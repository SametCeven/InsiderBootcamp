// ELEMENTS
let formData = {};

const form = document.querySelector(".form-section");
const formTitle = document.getElementById("title");
const formDescription = document.getElementById("description");
const formRadio = document.querySelector(".form-section form .radio");
const formAllRadios = document.querySelectorAll(".form-section .radio input")
const formButton = document.querySelector(".form-section form button");

const currentTaskSection = document.querySelector(".task-section");
const tasks = document.querySelector(".tasks");

const filter = document.getElementById("filter");
const sort = document.getElementById("sort");

let taskList = [];

// FORM INPUT EVENT
form.addEventListener("change", (e) => {
    if (e.target === formTitle) {
        formData["formTitle"] = e.target.value;
    } else if (e.target === formDescription) {
        formData["formDescription"] = e.target.value;
    } else if (e.target.type === "radio") {
        formData["formRadio"] = e.target.value;
    }
})



// FORM BUTTON SUBMIT EVENT
formButton.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        // FORM VALIDATION
        const errors = [];

        if (!formData.formTitle) errors.push("Title is required!")

        if (!formData.formDescription) errors.push("Description is required!")

        if (!formData.formRadio) errors.push("Priority is required!")

        if (errors.length > 0) throw new Error(errors.join(""));


        // RESETTING FORM
        formTitle.value = "";
        formTitle.textContent = "";
        formDescription.value = "";
        formDescription.textContent = "";
        formRadio.value = "";
        formAllRadios.forEach((r) => {
            r.checked = false;
        })
        const errContainer = document.querySelector(".error-container")
        if (errContainer) errContainer.remove();


        // ADDING TASK
        const div = document.createElement("div");
        div.classList.add("task")

        const h2 = document.createElement("h2");
        h2.value = formData.formTitle,
            h2.textContent = formData.formTitle;

        const p = document.createElement("p");
        p.value = formData.formDescription;
        p.textContent = formData.formDescription;

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container")

        const span = document.createElement("span");
        span.value = formData.formRadio;
        span.textContent = formData.formRadio;

        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "-"

        infoContainer.appendChild(span);
        infoContainer.appendChild(inputCheckbox);
        infoContainer.appendChild(deleteButton);

        div.setAttribute("priority", formData.formRadio);
        div.appendChild(infoContainer);
        div.appendChild(h2);
        div.appendChild(p);
        taskList.push(div);
        tasks.appendChild(div);

        formData = {};

    } catch (err) {
        errors = err.message.split("!");

        let errContainer = document.querySelector(".error-container");

        if (!errContainer) {
            errContainer = document.createElement("ul");
        }

        errContainer.classList.add("error-container");
        form.appendChild(errContainer);

        errContainer.innerHTML = "";

        errors.forEach((e) => {
            const errMessage = document.createElement("li");
            errMessage.classList.add("error-message");
            errMessage.textContent = e;
            errContainer.appendChild(errMessage);
        })
    }
})



// CURRENT TASK ELEMENTS
currentTaskSection.addEventListener("click", ((e) => {
    if (e.target.tagName === "BUTTON") {
        e.stopPropagation();
        const task = e.target.closest(".task");
        task.remove();
    } else if (e.target.tagName === "INPUT") {
        e.stopPropagation();
        const task = e.target.closest(".task")
        task.classList.toggle("completed", e.target.checked);
    }
}))



// FILTER BUTTON
filter.addEventListener("change", ((e) => {
    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach((task) => {
        const isCompleted = task.classList.contains("completed");

        if (e.target.value === "all") {
            task.style.display = "flex";
        } else if (e.target.value === "completed" && !isCompleted) {
            task.style.display = "none";
        } else if (e.target.value === "incomplete" && isCompleted) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    })
}))



// SORT BUTTON
const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
}
sort.addEventListener("change", (e) => {
    const allTasks = Array.from(document.querySelectorAll(".task"));

    if (e.target.value === "asc") {
        const sortedTasks = allTasks.sort((a, b) => {
            const aPriority = priorityOrder[a.getAttribute("priority")];
            const bPriority = priorityOrder[b.getAttribute("priority")];
            return aPriority - bPriority;
        })
        tasks.innerHTML = "";
        sortedTasks.forEach((task) => {
            tasks.appendChild(task);
        })
    } else if (e.target.value === "desc") {
        const sortedTasks = allTasks.sort((a, b) => {
            const aPriority = priorityOrder[a.getAttribute("priority")];
            const bPriority = priorityOrder[b.getAttribute("priority")];
            return bPriority - aPriority;
        })
        tasks.innerHTML = "";
        sortedTasks.forEach((task) => {
            tasks.appendChild(task);
        })
    } else if (e.target.value === "none") {
        tasks.innerHTML = "";
        taskList.forEach((task) => {
            tasks.appendChild(task);
        })
    }
})


