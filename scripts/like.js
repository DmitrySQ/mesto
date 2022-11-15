const likeStatus = document.querySelector(".element__button");

function changingTheState(){
  likeStatus.classList.toggle("element__button_active");
}

likeStatus.addEventListener("click", changingTheState);
