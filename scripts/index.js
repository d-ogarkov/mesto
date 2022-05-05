const elementTemplate = document.querySelector('#elements__item-template').content.querySelector('.element');
const elementList = document.querySelector('.elements__list');
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const popupFormEdit = document.querySelector('.popup_type_edit-form');
const popupFormAdd = document.querySelector('.popup_type_add-form');
const popupImageView = document.querySelector('.popup_type_image-view');
const popupImage = popupImageView.querySelector('.popup__image');
const popupCaption = popupImageView.querySelector('.popup__caption');
const btnsClose = document.querySelectorAll('.popup__close-btn');
const formEdit = document.querySelector('.edit-form');
const formAdd = document.querySelector('.add-form');
const titleCurrent = document.querySelector('.profile__title');
const subtitleCurrent = document.querySelector('.profile__subtitle');
const inputFormEditTitle = popupFormEdit.querySelector('.popup__input_type_title');
const inputFormEditSubtitle = popupFormEdit.querySelector('.popup__input_type_subtitle');
const inputFormAddTitle = popupFormAdd.querySelector('.popup__input_type_title');
const inputFormAddLink = popupFormAdd.querySelector('.popup__input_type_link');

// Открывает попап, переданный в аргументе
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрывает попап, переданный в аргументе
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открывает попап редактирования профиля, подставив в инпуты текущие данные со страницы
function openFormEdit() {
  inputFormEditTitle.value = titleCurrent.textContent;
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
  titleCurrent.textContent = inputFormEditTitle.value;
  subtitleCurrent.textContent = inputFormEditSubtitle.value;
  closePopup(popupFormEdit);
}

// Отправляет форму добавления карточки (создает в начале списка новую карточку с заданными названием и картинкой)
function submitFormAdd(evt) {
  evt.preventDefault();
  prependElement(createElement(inputFormAddTitle.value, inputFormAddLink.value));
  inputFormAddTitle.value = '';
  inputFormAddLink.value = '';
  closePopup(popupFormAdd);
}

// Переключает состояние лайка на карточке
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

// Возвращает карточку с заданными названием и адресом картинки
function createElement(elementTitle, elementImageSrc) {
  // Клонируем содержимое шаблона карточки
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  // Наполняем копию содержимым
  elementImage.src = elementImageSrc;
  elementImage.alt = elementTitle;
  element.querySelector('.element__title').textContent = elementTitle;

  // Добавляем обработчики событий
  elementImage.addEventListener('click', () => {
    openImageView(elementImageSrc, elementTitle);
  });
  element.querySelector('.element__like-btn').addEventListener('click', toggleLike);
  element.querySelector('.element__trash-btn').addEventListener('click', deleteElement);

  return element;
}

// Добавляет элемент на страницу в начало списка
function appendElement(element) {
  elementList.append(element);
}

// Добавляет элемент на страницу в конец списка
function prependElement(element) {
  elementList.prepend(element);
}

function deleteElement(evt) {
  evt.target.closest('.element').remove();
}

// Заполняет страницу начальным набором карточек, вызывая addElement в цикле
function fillPage() {
  initialCards.forEach(function(card) {
    appendElement(createElement(card.name, card.link));
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
formEdit.addEventListener('submit', submitFormEdit);
formAdd.addEventListener('submit', submitFormAdd);
