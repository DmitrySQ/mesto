export class Card {
  constructor(cardData, templateSelector, handleOpenPopupImage, handlePopupDeleteOpen, userID){
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerID = cardData.owner._id;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handlePopupDeleteOpen = handlePopupDeleteOpen;
    this._handleImageClick = handleOpenPopupImage;
    this._userID = userID;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector(".element")
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard(){
    this._buttonLike.classList.toggle("element__button_active");
  }

  _handleDeleteCard(){
    this._element.remove();
    this._element = null;
  }

  _handleRemoveDeleteButton(){
    if (this._ownerID != this._userID){
      this._buttonDelete.classList.add('element__button-trash_hide')
    }
  }

  generateCard(){
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._likeCounter = this._element.querySelector(".element__likes-counter");
    this._likeCounter.textContent = this._likes.length;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._buttonDelete = this._element.querySelector('.element__button-trash');
    this._buttonLike = this._element.querySelector('.element__button-like');
    
    this._handleRemoveDeleteButton();
    this._setIventListeners();

    return this._element;
  }
  _setIventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard(this);
    })
    this._buttonDelete.addEventListener('click', () => {
      this._handlePopupDeleteOpen(this);
    })
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    })
  }
}