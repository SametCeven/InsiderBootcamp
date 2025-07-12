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
form.addEventListener("change",(e)=>{
    e.stopPropagation()
    console.log(e)
    console.log(e.target)
    console.log(e.currentTarget)

    if(e.target === formTitle){
        formData["formTitle"] = e.target.value;
    }else if(e.target === formDescription){
        formData["formDescription"] = e.target.value;
    }else if(e.target.type === "radio"){
        formData["formRadio"] = e.target.value;
    }
    console.log(formData);
})


// FORM BUTTON SUBMIT EVENT
formButton.addEventListener("click",(e)=>{
    e.preventDefault();
    formTitle.value = "";
    formTitle.textContent = "";
    formDescription.value = "";
    formDescription.textContent = "";
    formRadio.value = "";
    formAllRadios.forEach((r)=>{
        r.checked = false;
    })
    
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
})



// CURRENT TASK ELEMENTS
const deleteButton = document.querySelector(".task button")
const inputCheckbox = document.querySelector(".task input")
