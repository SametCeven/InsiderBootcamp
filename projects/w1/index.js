
const favIcon = document.querySelector(".fav-icon-wrapper")

console.log(favIcon)

if(localStorage.getItem("like") === "1"){
    favIcon.classList.add("like")
}

favIcon.addEventListener("click", () => {
    const isLiked = favIcon.classList.toggle("like")
    localStorage.setItem("like",isLiked ? "1" : "0")
})




