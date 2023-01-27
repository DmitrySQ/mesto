
import { Card } from "./card.js";
import { initialCards, config } from "./data.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// Секция для добавления карточек
const sectionElements = document.querySelector(".elements");
// Элементы профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

// Попап профиля
const popupEdit = document.querySelector(".popup_edit");
const popupName = popupEdit.querySelector(".popup__item_el_name");
const popupDescription = popupEdit.querySelector(".popup__item_el_description");

// Попап добавления карточки
const popupCard = document.querySelector(".popup-add");
// Создание карточки
const createCard = (item) =>{
  const element = new Card(item.name, item.link, '#element-template', handleOpenPopupImage);
  const cardElement = element.generateCard();
  
  return cardElement;
}

//Рендер карточек
const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard (item, sectionElements);
    cardList.addItem(cardElement);
  }
}, sectionElements);

//Создание карточек из массива
initialCards.forEach((item) =>{
  createCard(item, sectionElements);
})
//Рендер карточек из массива
cardList.renderItems(initialCards);

//Добавление карточки через форму
const addPopupCreateHandler = (values) => {
  const card = {
    name: values.title,
    link: values.link
  };
  const newCard = createCard(card, sectionElements);
  cardList.addItem(newCard);
  popupAdd.close();
  popupAddValidation.disabledSubmitButton();
}

// Экземпляр класса попапа добавления карточек
const popupAdd = new PopupWithForm(".popup-add", addPopupCreateHandler);

// Экземпляр класса попапа профиля
const popupProfile = new PopupWithForm(".popup_edit", editPopupSubmitHandler);

// Экземпляр класса информации о пользователе
const userInfo = new UserInfo ({
  nameSelector: profileName, 
  infoSelector: profileDescription
});

// Экземпляр класса попапа картинки
const popupImage = new PopupWithImage(".popup_img");

// Функция обработчика сабмита попапа профиля 
function editPopupSubmitHandler(values) {
  userInfo.setUserInfo(values.name, values.description)
  popupProfile.close();
}

// Слушатель открытия и функция добавления информации из профиля в инпуты
buttonEdit.addEventListener("click", function() {
  const userData = userInfo.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.description;
  popupProfile.open();
});

// Функция открытия попапа картинки
function handleOpenPopupImage(name, link) {
  popupImage.open(name, link);
}

// Слушатели закрытий
popupProfile.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

// Слушатель открытия попапа добавления карточки
buttonAdd.addEventListener("click", function() {
  popupAdd.open();
});

// Экземпляры классов валидации форм попапов
const popupEditValidation = new FormValidator (config, popupEdit);
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator (config, popupCard);
popupAddValidation.enableValidation();

