const container = document.getElementsByClassName("container")[0]
container.setAttribute("deneme","test")
container.removeAttribute("deneme")

const div = document.createElement("div")
div.className = "new-child"

//container.replaceChild(div,container.firstElementChild);

container.addEventListener("click",(e)=>{
    console.log(e.target)

})






