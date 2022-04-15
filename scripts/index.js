const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const editForm = document.querySelector('.edit-form');
let titleCurrent = document.querySelector('.profile__title');
let subtitleCurrent = document.querySelector('.profile__subtitle');
let titleInput = popup.querySelector('.popup__input_type_title');
let subtitleInput = popup.querySelector('.popup__input_type_subtitle');

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

function popupOpen() {
  titleInput.value = titleCurrent.textContent;
  subtitleInput.value = subtitleCurrent.textContent;
  popupToggle();
}

function popupClose(evt) {
  evt.preventDefault();
  popupToggle();
}

function formSubmit(evt) {
  evt.preventDefault();
  let title = titleInput.value;
  let subtitle = subtitleInput.value;
  titleCurrent.textContent = title;
  subtitleCurrent.textContent = subtitle;
  popupToggle();
}

editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
editForm.addEventListener('submit', formSubmit);

editForm.addEventListener("keypress", function onEvent(evt) {
  if (evt.key === "Enter") {
    formSubmit(evt);
  }
});
