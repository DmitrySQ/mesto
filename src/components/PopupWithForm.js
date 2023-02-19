import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__item");
    this._submitButton = this._popup.querySelector(".popup__button-submit")
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    })
    return this._values;
  }

  loadingButton(isLoading, text = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = text;
    } 
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
