// ELEMENTS
let formData = {};

const form = document.querySelector(".form-section");
const formTitle = document.getElementById("title");
const formDescription = document.getElementById("description");
const formRadio = document.querySelector(".form-section form .radio");
const formAllRadios = document.querySelectorAll(".form-section .radio input")
const formButton = document.querySelector(".form-section form button");

const currentTaskSection = document.querySelector(".task-section");


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

        div.appendChild(infoContainer);
        div.appendChild(h2);
        div.appendChild(p);
        currentTaskSection.appendChild(div);

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
    }
}))




