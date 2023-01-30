
import { Card } from "./components/Card.js";
import { initialCards, validationConfig, sectionElements } from "./utils/data.js";
import { Section } from "./components/Section.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import './index.css';

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
const createCard = (cardData) =>{
  const element = new Card(cardData, '#element-template', handleOpenPopupImage);
  const cardElement = element.generateCard();
  
  return cardElement;
}

//Рендер карточек
const cardSection = new Section({
  renderer: (item) => {
    const cardElement = createCard (item, sectionElements);
    cardSection.addItem(cardElement);
  }
}, sectionElements);

//Создание карточек из массива
initialCards.forEach((item) =>{
  createCard(item, sectionElements);
})
//Рендер карточек из массива
cardSection.renderItems(initialCards);

// Экземпляр класса попапа добавления карточек
const popupAdd = new PopupWithForm(".popup-add", handleCardFormSubmit);

// Экземпляр класса попапа профиля
const popupProfile = new PopupWithForm(".popup_edit", handleProfileFormSubmit);

// Экземпляр класса информации о пользователе
const userInfo = new UserInfo ({
  nameElement: profileName, 
  infoElement: profileDescription
});

// Экземпляр класса попапа картинки
const popupImage = new PopupWithImage(".popup_img");

// Экземпляры классов валидации форм попапов
const popupEditValidation = new FormValidator (validationConfig, popupEdit);
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator (validationConfig, popupCard);
popupAddValidation.enableValidation();

//Добавление карточки через форму
function handleCardFormSubmit (values) {
  const card = {
    name: values.title,
    link: values.link
  };
  const newCard = createCard(card, sectionElements);
  cardSection.addItem(newCard);
  popupAdd.close();
  popupAddValidation.disableSubmitButton();
}

// Функция обработчика сабмита попапа профиля 
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values.name, values.description)
  popupProfile.close();
}

// Функция добавления информации из профиля в инпуты
function handleProfileFormOpen() {
  const userData = userInfo.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.description;
  popupProfile.open();
}
// Слушатель открытия попапа профиля
buttonEdit.addEventListener("click", handleProfileFormOpen);

// Функция открытия попапа картинки
function handleOpenPopupImage(name, link) {
  popupImage.open(name, link);
}

// Слушатель открытия попапа добавления карточки
buttonAdd.addEventListener("click", function() {
  popupAdd.open();
});

// Слушатели закрытий
popupProfile.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();



