export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) =>{
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')){
        this.close();
      }
    })
  }
}