export class Card {
  constructor({name, link}, templateSelector, handleOpenPopupImage){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleOpenPopupImage;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector(".element")
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard(){
    this._likeButton.classList.toggle("element__button_active");
  }

  _handleDeleteCard(){
    this._element.remove();
    this._element = null;
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
    this._likeButton = this._element.querySelector('.element__button-like');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard()
    })
    this._deleteButton = this._element.querySelector('.element__button-trash');
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard()
    })
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    })
  }
}