const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const popupButtonClose = popup.querySelector(".popup__button-close");
const popupName = popup.querySelector(".popup__item_el_name");
const popupDescription = popup.querySelector(".popup__item_el_description");
const popupForm = popup.querySelector(".popup__form");

function popupOpened() {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function popupClosed() {
  popup.classList.remove("popup_opened");
}

function popupSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClosed();
}

editButton.addEventListener("click", popupOpened);
popupButtonClose.addEventListener("click", popupClosed);
popupForm.addEventListener("submit", popupSubmitHandler);
