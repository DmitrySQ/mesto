
import { Card } from "../components/Card.js";
import { cardsContainer, profileName, profileDescription, 
        profileImage, buttonEdit, buttonAdd, 
        popupEdit, popupName, popupDescription, 
        popupCard, popupChangeAvatar} from "../utils/constants.js";
import { validationConfig } from "../utils/validationConfig.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'bd60ed56-65da-400e-aff3-13c3befce97c',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
    cardsSection.renderItems(cards.reverse())
  })
  .catch((err) => {
    console.log(err);
  })


  // Экземпляр класса информации о пользователе
const userInfo = new UserInfo ({
  nameElement: profileName, 
  infoElement: profileDescription,
  avatarElement: profileImage
});

//Рендер карточек
const cardsSection = new Section({
  renderer: (cardData) => {
    const card = new Card(cardData, '#element-template', handleOpenPopupImage, handlePopupDeleteOpen, handleLikeClick, userInfo.getID());
    const cardElement = card.generateCard();
    return cardElement
  },
}, cardsContainer);

// Экземпляр класса попапа добавления карточек
const popupAdd = new PopupWithForm(".popup-add", handleCardFormSubmit);
// Экземпляр класса попапа профиля
const popupProfile = new PopupWithForm(".popup_edit", handleProfileFormSubmit);
// Экземпляр класса попапа аватара
const popupAvatar = new PopupWithForm(".popup_avatar", handleAvatarFormSubmit);
// Экземпляр класса попапа картинки
const popupImage = new PopupWithImage(".popup_img");
// Экземпляр класса попапа удаления карточки
const popupDelete = new PopupConfirm(".popup_delete", handleDeleteCardFormSubmit);

//Добавление карточки через форму
function handleCardFormSubmit (values) {
  popupAdd.setIsLoading(true);
  api.createCard(values.title, values.link)
    .then((cardData) => {
      cardsSection.addItem(cardData)
      popupAdd.close();
      popupAddValidation.disableSubmitButton();
  })
    .catch((err) => {
      console.log(err)
  })
    .finally(() => {
      popupAdd.setIsLoading(false)
  })
}

// Функция обработчика сабмита попапа профиля 
function handleProfileFormSubmit(values) {
  popupProfile.setIsLoading(true);
  api.setUserInfo(values.name, values.description)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id)
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err)
  })
    .finally(() => {
      popupProfile.setIsLoading(false);
  })
}
// Я попробовал реализовать функцию, но никак не приходит в голову, как передать элемент карточки, 
// если в колбек мы не должны передавать никаких аргументов(имею ввиду экземпляр карточки).
// направьте пожалуйста, было бы интересно разобраться, но сейчас в голову ничего не приходит
function handleDeleteCardFormSubmit(card) {
  popupDelete.setIsLoading(true)
  api.deleteCard(card.getCardID())
    .then(() => {
      card.deleteCard();
      popupDelete.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    popupDelete.setIsLoading(false)
  })
}

function handleAvatarFormSubmit(values) {
  popupAvatar.setIsLoading(true);
  api.addNewAvatar(values.avatar)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
      popupAvatar.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    popupAvatar.setIsLoading(false)
  })
}

// Функция добавления информации из профиля в инпуты
function handleProfileFormOpen() {
  const userData = userInfo.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.description;
  popupProfile.open();
}

function handlePopupDeleteOpen(card) {
  popupDelete.open(card)
}
// Функция открытия попапа картинки
function handleOpenPopupImage(name, link) {
  popupImage.open(name, link);
}

const handleLikeClick = (cardId, card) => {
  const method = card.isLiked() ? 'DELETE' : 'PUT'
  api.setLike(cardId, method)
    .then((res) => {
      card.toggleLike();
      card.setLikesValue(res.likes);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Слушатель открытия попапа профиля
buttonEdit.addEventListener("click", handleProfileFormOpen);

// Слушатель открытия попапа добавления карточки
buttonAdd.addEventListener("click", function() {
  popupAdd.open();
});
// Слушатель открытия попапа аватара
profileImage.addEventListener("click", function() {
  popupAvatar.open();
})

// Экземпляры классов валидации форм попапов
const popupEditValidation = new FormValidator (validationConfig, popupEdit);
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator (validationConfig, popupCard);
popupAddValidation.enableValidation();
const popupAvatarValidation = new FormValidator (validationConfig, popupChangeAvatar);
popupAvatarValidation.enableValidation();

// Слушатели закрытий
popupProfile.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners()
popupImage.setEventListeners();
popupDelete.setEventListeners();



