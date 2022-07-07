import { formSettings, apiSettings } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';

const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const btnAvatar = document.querySelector('.profile__avatar');
const inputFormEditName = document.querySelector('.popup__input_type_name');
const inputFormEditAbout = document.querySelector('.popup__input_type_about');
const formValidators = {};
let cardList = {};

// Открывает попап редактирования профиля, подставив в инпуты текущие данные со страницы
function openFormEdit() {
  const currentUserInfo = userInfo.getUserInfo();
  inputFormEditName.value = currentUserInfo.name;
  inputFormEditAbout.value = currentUserInfo.about;
  formValidators['edit-form'].resetValidation();
  popupFormEdit.open();
}

// Открывает попап добавления карточки
function openFormAdd() {
  formValidators['add-form'].resetValidation();
  popupFormAdd.open();
}

function openFormDelete(handleActionConfirmed, data) {
  popupFormDelete.open(handleActionConfirmed, data);
}

// Открывает попап просмотра картинки, подставляя в него адрес картинки, на которую кликнули, и ее название
function openImageView(imageSrc, titleText) {
  popupImageView.open(imageSrc, titleText);
}

function openFormAvatar() {
  formValidators['avatar-form'].resetValidation();
  popupFormAvatar.open();
}

// Отправляет форму редактирования профиля на сервер, подставляет данные на страницу и закрывает попап
function submitFormEdit(evt, inputValues) {
  evt.preventDefault();
  const name = inputValues['name-input'];
  const about = inputValues['about-input'];
  api.setUserInfo({ name, about })
    .then((res) => {
      userInfo.setUserInfo(res);
    });
  popupFormEdit.close();
}

// Отправляет форму добавления карточки (создает в начале списка новую карточку с заданными названием и картинкой)
function submitFormAdd(evt, inputValues) {
  evt.preventDefault();
  const name = inputValues['title-input'];
  const link = inputValues['link-input'];
  api.addCard({ name, link })
    .then(res => {
      // Здесь id создателя карточки совпадает с id текущего пользователя
      const cardElement = createCard(res, res.owner._id);
      cardList.prependItem(cardElement);
      formValidators['add-form'].resetValidation();
      popupFormAdd.close();
    });
}

function submitFormDelete(evt, handleDelete, cardId) {
  evt.preventDefault();
  // Удаляем карточку с сервера по переданному cardId
  api.deleteCard(cardId)
    .then(() => {
      // Вызываем обработчик удаления карточки в Card, который удалит ее из DOM
      handleDelete();
    });
  popupFormDelete.close();
}

function submitFormAvatar(evt, inputValues) {
  evt.preventDefault();
  const link = inputValues['avatar-input'];
  api.setAvatar({ avatar: link })
    .then(() => {
      userInfo.setAvatar(link);
    });
  popupFormAvatar.close();
}

function toggleCardLike(handleRefreshLikes, { cardId, userLikes }) {
  if (userLikes === false) {
    api.setLike(cardId)
      .then((res) => {
        handleRefreshLikes(res);
      });
  } else {
    api.unsetLike(cardId)
      .then((res) => {
        handleRefreshLikes(res);
      });
  }
}

// Создает и возвращает экземпляр карточки с установленными обработчиками событий
function createCard(cardData, userId) {
  const card = new Card(cardData, userId, '#elements__item-template', openImageView, openFormDelete, toggleCardLike);
  const cardElement = card.generateCard();
  return cardElement;
}

const addEventListeners = () => {
  btnEdit.addEventListener('click', openFormEdit);
  btnAdd.addEventListener('click', openFormAdd);
  btnAvatar.addEventListener('click', openFormAvatar);
  popupFormEdit.setEventListeners()
  popupFormAdd.setEventListeners();
  popupFormDelete.setEventListeners();
  popupImageView.setEventListeners();
  popupFormAvatar.setEventListeners();
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
const popupFormDelete = new PopupWithConfirmation('.popup_type_delete', submitFormDelete);
const popupImageView = new PopupWithImage('.popup_type_image-view');
const popupFormAvatar = new PopupWithForm('.popup_type_avatar-form', submitFormAvatar);

// API
const api = new Api({
  baseUrl: apiSettings.baseUrl,
  headers: {
    authorization: apiSettings.authorization,
    'Content-Type': 'application/json'
  }
});

// Информация о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

// Чтобы правильно отрисовать карточки, нужно получить и информацию о пользователе, и данные карточек.
// Начнем отрисовку, когда выполнятся оба промиса:
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resUserInfo, resInitialCards]) => {
    // Заполняем элементы на странице загруженной информацией о пользователе
    userInfo.setUserInfo(resUserInfo);
    // Отрисовываем секцию карточек, передавая id пользователя, чтобы кнопка удаления была только у своих карточек.
    // cardList понадобится в submitFormAdd, поэтому объявлен глобально
    cardList = new Section({
      items: resInitialCards,
      renderer: (cardData) => {
        const cardElement = createCard(cardData, resUserInfo._id);
        cardList.addItem(cardElement);
        },
      },
      '.elements__list'
    );
    cardList.renderItems();
  });

// Добавляем обработчики событий
addEventListeners();

// Добавляем валидацию форм
enableValidation(formSettings);
