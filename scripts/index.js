const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
// профиль
const popup = document.querySelector(".popup");
const addButton = document.querySelector(".profile__add-button");
const popupButtonClose = popup.querySelector(".popup__button-close");
const popupName = popup.querySelector(".popup__item_el_name");
const popupDescription = popup.querySelector(".popup__item_el_description");
const popupForm = popup.querySelector(".popup__form");
// карточки
const addPopup = document.getElementById("popup-add");
const addPopupForm = document.getElementById("add-popup-form")
const addPopupButtonClose = document.getElementById("popup-add-button-close");
const addPopupButtonCreate = document.getElementById("add-popup-button-create");
const addPopupTitle = document.querySelector(".popup__item_el_title");
const addPopupLink = document.querySelector(".popup__item_el_link");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content.querySelector(".element");
function createCards (item){
  const card = elementTemplate.cloneNode(true);
  const cardImage = card.querySelector(".element__image");
  const cardTitle = card.querySelector(".element__title");
  const cardDeleteButton = card.querySelector(".element__button-trash");
  const cardLikeButton = card.querySelector(".element__button-like");
  cardDeleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;
  
  return card;
};
const likeCard = function(e){
  e.target.classList.toggle("element__button_active");
};
const deleteCard = function(e){
  e.target.closest(".element").remove();
};

initialCards.forEach((item) =>{
  const element = createCards(item);
  elementsList.append(element);
})

const popupOpened = function(item){
  item.classList.add("popup_opened");
  if (item === popup){
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    return;
  }
}

const popupClosed = function (item) {
  item.classList.remove("popup_opened");
}


function popupSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClosed(popup);
}

function addPopupCreateHandler(evt){
  evt.preventDefault();
  const card = {
    name: addPopupTitle.value,
    link: addPopupLink.value
  };
  const element = createCards(card);
  elementsList.prepend(element);
}

editButton.addEventListener("click", function(){
  popupOpened(popup);
});
addButton.addEventListener("click", function(){
  popupOpened(addPopup);
});


popupButtonClose.addEventListener("click", function(){
  popupClosed(popup);
});
addPopupButtonClose.addEventListener("click", function(){
  popupClosed(addPopup);
});

popupForm.addEventListener("submit", popupSubmitHandler);
addPopupForm.addEventListener("submit", addPopupCreateHandler);