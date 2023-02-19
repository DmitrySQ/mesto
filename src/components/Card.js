export class Card {
  constructor(cardData, templateSelector, handleOpenPopupImage, handlePopupDeleteOpen, handleLikeClick, userID){
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerID = cardData.owner._id;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleDeleteClick = handlePopupDeleteOpen;
    this._handleImageClick = handleOpenPopupImage;
    this._handleLikeClick = handleLikeClick;
    this._userID = userID;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector(".element")
    .cloneNode(true);

    return cardElement;
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  toggleLike(){
    this._buttonLike.classList.toggle("element__button_active");
  }

  _toggleLikeButton() {
    if (this.isLiked()) {
      this.toggleLike();
    }
  }

  _checkDeleteButtonVisibility(){
    if (this._ownerID !== this._userID){
      this._buttonDelete.classList.add('element__button-trash_hide')
    }
  }

  _updateLikesCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._likeCounter = this._element.querySelector(".element__likes-counter");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._buttonDelete = this._element.querySelector('.element__button-trash');
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._setEventListeners();
    this._checkDeleteButtonVisibility();
    this._toggleLikeButton();
    this._updateLikesCounter();

    return this._element;
  }

  isLiked() {
    const isLikedByMe = this._likes.some(like => like._id === this._userID)
    return isLikedByMe
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._id, this);
    })
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    })
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    })
  }

  getCardID() {
    return this._id;
  }
  
  setLikesValue(likes) {
    this._likes = likes
    this._updateLikesCounter()
  }
}