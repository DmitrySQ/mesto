// Секция для добавления карточек
export const cardsContainer = document.querySelector(".elements");

// Элементы профиля
export const profileName = document.querySelector(".profile__name");
export const profileImage = document.querySelector(".profile__image")
export const profileDescription = document.querySelector(".profile__description");
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");

// Попап профиля
export const popupEdit = document.querySelector(".popup_edit");
export const popupName = popupEdit.querySelector(".popup__item_el_name");
export const popupDescription = popupEdit.querySelector(".popup__item_el_description");

// Попап добавления карточки
export const popupCard = document.querySelector(".popup-add");

// Попап смены аватара
export const popupChangeAvatar = document.querySelector(".popup_avatar");