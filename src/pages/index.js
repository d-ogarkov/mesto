import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';

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
const inputFormEditName = document.querySelector('.popup__input_type_name');
const inputFormEditSubtitle = document.querySelector('.popup__input_type_subtitle');
const formValidators = {};

// Открывает попап редактирования профиля, подставив в инпуты текущие данные со страницы
function openFormEdit() {
  const currentUserInfo = userInfo.getUserInfo();
  inputFormEditName.value = currentUserInfo.name;
  inputFormEditSubtitle.value = currentUserInfo.subtitle;
  formValidators['edit-form'].resetValidation();
  popupFormEdit.open();
}

// Открывает попап добавления карточки
function openFormAdd() {
  formValidators['add-form'].resetValidation();
  popupFormAdd.open();
}

// Открывает попап просмотра картинки, подставляя в него адрес картинки, на которую кликнули, и ее название
function openImageView(imageSrc, titleText) {
  popupImageView.open(imageSrc, titleText);
}

// Отправляет форму редактирования профиля (подставляет на страницу данные из инпутов) и закрывает попап
function submitFormEdit(evt, inputValues) {
  evt.preventDefault();
  userInfo.setUserInfo(inputValues['name-input'], inputValues['subtitle-input']);
  popupFormEdit.close();
}

// Отправляет форму добавления карточки (создает в начале списка новую карточку с заданными названием и картинкой)
function submitFormAdd(evt, inputValues) {
  evt.preventDefault();
  const cardElement = createCard({
    title: inputValues['title-input'],
    imageSrc: inputValues['link-input']
  });
  prependElement(cardElement);
  formValidators['add-form'].resetValidation();
  popupFormAdd.close();
}

// Создает и возвращает экземпляр карточки с установленными обработчиками событий
function createCard(cardData) {
  const card = new Card(cardData, '#elements__item-template', openImageView);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавляет элемент на страницу в конец списка
function prependElement(element) {
  elementList.prepend(element);
}

// Заполняет страницу начальным набором карточек, вызывая addElement в цикле
const fillPage = () => {
  const cardList = new Section({
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
      },
    },
    '.elements__list'
  );

  cardList.renderItems();
}

const addEventListeners = () => {
  btnEdit.addEventListener('click', openFormEdit);
  btnAdd.addEventListener('click', openFormAdd);
  popupFormEdit.setEventListeners()
  popupFormAdd.setEventListeners();
  popupImageView.setEventListeners();
}

// Добавляет валидацию ко всем формам
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Подготовка страницы к работе

// Попапы
const popupFormEdit = new PopupWithForm('.popup_type_edit-form', submitFormEdit);
const popupFormAdd = new PopupWithForm('.popup_type_add-form', submitFormAdd);
const popupImageView = new PopupWithImage('.popup_type_image-view');

// Информация о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__subtitle');

// Заполняем страницу начальным набором карточек
fillPage();

// Добавляем обработчики событий
addEventListeners();

// Добавляем валидацию форм
enableValidation(formSettings);
