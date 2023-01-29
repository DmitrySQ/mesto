import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardName = this._popup.querySelector('.popup__title');
    this._cardImage = this._popup.querySelector('.popup__image');
  }
  open (name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardName.textContent = name;
    super.open();
  }
}