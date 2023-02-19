import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup{
  constructor (popupSelector, handleSubmitForm){
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__button-submit")
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._card);
    })
  }  

  setIsLoading(isLoading, text = "Удаление..."){
    if (isLoading) {
      this._submitButton.textContent = text;
    } 
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  open(card) {
    this._card = card;
    super.open();
  }
}