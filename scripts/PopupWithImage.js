import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open (name, link) {
    const cardName = document.querySelector('.popup__title');
    const cardImage = document.querySelector('.popup__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;

    super.open();
  }
}