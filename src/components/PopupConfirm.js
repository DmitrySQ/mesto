import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup{
  constructor (popupSelector, handleSubmitForm){
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__button-submit")
    console.log(this._submitButton)
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt, this._card);
    })
  }  

  open(card) {
    this._card = card;
    console.log(card._id)
    super.open();
  }
}