export class Card {
  constructor(name, link, templateSelector, handleOpenPopupImage){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
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
    this._element.remove();
  }

  generateCard(){
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
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
    this._elementImage.addEventListener('click', () => {
      console.log(this._elementImage)
      this._handleOpenPopupImage(this._name, this._link);
    })
  }
}