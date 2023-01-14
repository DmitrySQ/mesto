
import { Card } from "./card.js";
import { initialCards, config } from "./data.js";
import { FormValidator } from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const buttonEdit = document.querySelector(".profile__edit-button");
const sectionElements = document.querySelector(".elements");
// профиль
const popupEdit = document.querySelector(".popup_edit");
const buttonAdd = document.querySelector(".profile__add-button");
const popupEditButtonClose = popupEdit.querySelector(".popup__button-close");
const popupName = popupEdit.querySelector(".popup__item_el_name");
const popupDescription = popupEdit.querySelector(".popup__item_el_description");
const popupEditForm = popupEdit.querySelector(".popup__form");

// карточки
const popupAdd = document.getElementById("popup-add");
const popupAddForm = document.getElementById("add-popup-form")
const popupAddButtonClose = document.getElementById("popup-add-button-close");
const popupAddButtonCreate = document.getElementById("add-popup-button-create");
const popupAddTitle = popupAdd.querySelector(".popup__item_el_title");
const popupAddLink = popupAdd.querySelector(".popup__item_el_link");

// картинки
const imgPopup = document.querySelector(".popup_img");
const popupImage = imgPopup.querySelector(".popup__image");
const popupTitle = imgPopup.querySelector(".popup__title")
const imgPopupButtonClose = document.getElementById("popup-img-button-close");

//Функция создания карточки
const createCard = (item, elementsZone) =>{
  const element = new Card(item.name, item.link, '#element-template', handleOpenPopupImage);
  const cardElement = element.generateCard();
  
  elementsZone.prepend(cardElement);
}

//Перебор массива
initialCards.forEach((item) =>{
  createCard(item, sectionElements);
})
//открытие попапов
const openPopup = function(item){
  item.classList.add("popup_opened");
  document.addEventListener('keyup', handleKeyUp);
}
//открытие попапа редактирования
const openEditPopup = function(){
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

//открытие попапа карточки
function handleOpenPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupTitle.textContent = name;
  openPopup(imgPopup);
}

//закрытие
const closePopup = function (item) {
  item.classList.remove("popup_opened");
  document.removeEventListener('keyup', handleKeyUp)
}
//обработчик редактирования
function editPopupSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEdit);
}
//обработчик добавления
function addPopupCreateHandler(evt) {
  evt.preventDefault();
  const card = {
    name: popupAddTitle.value,
    link: popupAddLink.value
  };
  createCard(card, sectionElements);
  closePopup(popupAdd);
  popupAddTitle.value = "";
  popupAddLink.value = "";
  popupAddValidation.disabledSubmitButton();
}
//закрытие на "ESC"

const handleKeyUp = (e) => {
  if (e.key === 'Escape'){
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

buttonEdit.addEventListener("click", function() {
  openEditPopup();
  openPopup(popupEdit);
});
buttonAdd.addEventListener("click", function() {
  openPopup(popupAdd);
});

popupEditButtonClose.addEventListener("click", function() {
  closePopup(popupEdit);
});
popupAddButtonClose.addEventListener("click", function() {
  closePopup(popupAdd);
});

imgPopupButtonClose.addEventListener("click", function() {
  closePopup(imgPopup);
})

//оверлей
const setOverlayCloseListener = (popup) => {
  popup.addEventListener('click', (evt) =>{
    if (evt.target.classList.contains('popup')){
      closePopup(popup)
    }
  })
}
setOverlayCloseListener(popupEdit);
setOverlayCloseListener(popupAdd);
setOverlayCloseListener(imgPopup);

popupEditForm.addEventListener("submit", editPopupSubmitHandler);
popupAddForm.addEventListener("submit", addPopupCreateHandler);

//валидация 
const popupEditValidation = new FormValidator (config, popupEdit);
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator (config, popupAdd);
popupAddValidation.enableValidation();
