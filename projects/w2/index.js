// ELEMENTS
let formData = {};

const form = document.querySelector(".form-section");
const formTitle = document.getElementById("title");
const formDescription = document.getElementById("description");
const formRadio = document.querySelector(".form-section form .radio");
const formButton = document.querySelector(".form-section form button");

const currentTaskSection = document.querySelector(".current-task-section");


// FORM EVENTS
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

formButton.addEventListener("click",(e)=>{
    e.preventDefault();
    formTitle.value = "";
    formTitle.textContent = "";
    formDescription.value = "";
    formDescription.textContent = "";
    formRadio.value = "";

    const div = document.createElement("div");
    
    const h2 = document.createElement("h2");
    h2.value = formData.formTitle,
    h2.textContent = formData.formTitle;
    
    const p = document.createElement("p");
    p.value = formData.formDescription;
    p.textContent = formData.formDescription;

    const r = document.createElement("p");
    r.value = formData.formRadio;
    r.textContent = formData.formRadio;

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(r);
    currentTaskSection.appendChild(div);
})