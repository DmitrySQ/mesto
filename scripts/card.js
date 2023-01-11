import { openPopup, imgPopup, popupImage, popupTitle } from "./index.js";


export class Card {
  constructor(name, link, templateSelector){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector(".element")
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard(){
    this._element.querySelector('.element__button-like').classList.toggle("element__button_active");
  }

  _handleDeleteCard(){
    this._element.querySelector('.element__button-trash').closest(".element").remove();
  }

  _handleOpenPopup(){
    openPopup(imgPopup);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;
  }

  _handleClosePopup(){
    popupImage.src = '';
    popupImage.classList.remove("popup_opened");
  }

  generateCard(){
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__title").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    
    this._setIventListeners();

    return this._element;
  }
  _setIventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._handleLikeCard()
    })
    this._element.querySelector('.element__button-trash').addEventListener('click', () => {
      this._handleDeleteCard()
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup()
    })
  }
}