import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    title: 'Архыз',
    imageSrc: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    imageSrc: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    imageSrc: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    imageSrc: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    imageSrc: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    imageSrc: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const elementList = document.querySelector('.elements__list');
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const popupFormEdit = document.querySelector('.popup_type_edit-form');
const popupFormAdd = document.querySelector('.popup_type_add-form');
const popupImageView = document.querySelector('.popup_type_image-view');
const popupImage = popupImageView.querySelector('.popup__image');
const popupCaption = popupImageView.querySelector('.popup__caption');
const popupOverlays = document.querySelectorAll('.popup');
const btnsClose = document.querySelectorAll('.popup__close-btn');
const formEdit = document.querySelector('.edit-form');
const formAdd = document.querySelector('.add-form');
const formAddSubmitBtn = formAdd.querySelector('.popup__submit-btn');
const nameCurrent = document.querySelector('.profile__name');
const subtitleCurrent = document.querySelector('.profile__subtitle');
const inputFormEditName = popupFormEdit.querySelector('.popup__input_type_name');
const inputFormEditSubtitle = popupFormEdit.querySelector('.popup__input_type_subtitle');
const inputFormAddTitle = popupFormAdd.querySelector('.popup__input_type_title');
const inputFormAddLink = popupFormAdd.querySelector('.popup__input_type_link');

// Обрабатывает нажатие клавиш для закрытия попапа по Esc
function handlePopupKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Открывает попап, переданный в аргументе
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupKey);
}

// Закрывает попап, переданный в аргументе
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupKey);
}

// Открывает попап редактирования профиля, подставив в инпуты текущие данные со страницы
function openFormEdit() {
  inputFormEditName.value = nameCurrent.textContent;
  inputFormEditSubtitle.value = subtitleCurrent.textContent;
  openPopup(popupFormEdit);
}

// Открывает попап добавления карточки
function openFormAdd() {
  openPopup(popupFormAdd);
}

// Открывает попап просмотра картинки, подставляя в него адрес картинки, на которую кликнули, и ее название
function openImageView(imageSrc, titleText) {
  popupImage.src = imageSrc;
  popupImage.alt = titleText;
  popupCaption.textContent = titleText;
  openPopup(popupImageView);
}

// Отправляет форму редактирования профиля (подставляет на страницу данные из инпутов) и закрывает попап
function submitFormEdit(evt) {
  evt.preventDefault();
  nameCurrent.textContent = inputFormEditName.value;
  subtitleCurrent.textContent = inputFormEditSubtitle.value;
  closePopup(popupFormEdit);
}

// Отправляет форму добавления карточки (создает в начале списка новую карточку с заданными названием и картинкой)
function submitFormAdd(evt) {
  evt.preventDefault();
  const card = new Card({
    title: inputFormAddTitle.value,
    imageSrc: inputFormAddLink.value
  }, '#elements__item-template', openImageView);
  const cardElement = card.generateCard();
  prependElement(cardElement);
  formAdd.reset();
  formAddSubmitBtn.classList.add('popup__submit-btn_disabled');
  closePopup(popupFormAdd);
}

// Добавляет элемент на страницу в начало списка
function appendElement(element) {
  elementList.append(element);
}

// Добавляет элемент на страницу в конец списка
function prependElement(element) {
  elementList.prepend(element);
}

// Заполняет страницу начальным набором карточек, вызывая addElement в цикле
function fillPage() {
  initialCards.forEach(function(cardData) {
    const card = new Card(cardData, '#elements__item-template', openImageView);
    const cardElement = card.generateCard();
    appendElement(cardElement);
  });
}

// Подготовка страницы к работе

// Заполняем страницу начальным набором карточек
fillPage();

// Добавляем обработчики событий
btnEdit.addEventListener('click', openFormEdit);
btnAdd.addEventListener('click', openFormAdd);
btnsClose.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'));
  });
});
popupOverlays.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});
formEdit.addEventListener('submit', submitFormEdit);
formAdd.addEventListener('submit', submitFormAdd);

// Добавляем валидацию форм
const formEditValidator = new FormValidator(formSettings, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(formSettings, formAdd);
formAddValidator.enableValidation();
