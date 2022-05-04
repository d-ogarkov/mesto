const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const popupEditForm = document.querySelector('.popup__edit-form');
const popupAddForm = document.querySelector('.popup__add-form');
const popupImageView = document.querySelector('.popup__image-view');
const popupImage = popupImageView.querySelector('.popup__image');
const closeBtns = document.querySelectorAll('.popup__close-btn');
const editForm = document.querySelector('.edit-form');
const addForm = document.querySelector('.add-form');
const titleCurrent = document.querySelector('.profile__title');
const subtitleCurrent = document.querySelector('.profile__subtitle');
let editFormTitleInput = popupEditForm.querySelector('.popup__input_type_title');
let editFormSubtitleInput = popupEditForm.querySelector('.popup__input_type_subtitle');
const addFormTitleInput = popupAddForm.querySelector('.popup__input_type_title');
const addFormLinkInput = popupAddForm.querySelector('.popup__input_type_link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Переключает видимость попапа, переданного в качестве аргумента
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Открывает попап редактирования профиля, подставив в инпуты текущие данные со страницы
function openEditForm() {
  editFormTitleInput.value = titleCurrent.textContent;
  editFormSubtitleInput.value = subtitleCurrent.textContent;
  togglePopup(popupEditForm);
}

// Открывает попап добавления карточки
function openAddForm() {
  togglePopup(popupAddForm);
}

// Открывает попап просмотра картинки, подставляя в него адрес картинки, на которую кликнули, и ее название
function openImageView(evt) {
  const element = evt.target.closest('.element');
  const titleText = element.querySelector('.element__title').textContent;
  const caption = popupImageView.querySelector('.popup__caption');
  popupImage.src = evt.target.src;
  popupImage.alt = titleText;
  caption.textContent = titleText;
  togglePopup(popupImageView);
}

// Универсальная функция закрытия любого попапа. Закрывает попап, внутри которого произошел клик
function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  togglePopup(popup);
}

// Отправляет форму редактирования профиля (подставляет на страницу данные из инпутов) и закрывает попап
function submitEditForm(evt) {
  evt.preventDefault();
  titleCurrent.textContent = editFormTitleInput.value;
  subtitleCurrent.textContent = editFormSubtitleInput.value;
  togglePopup(popupEditForm);
}

// Отправляет форму добавления карточки (создает в начале списка новую карточку с заданными названием и картинкой)
function submitAddForm(evt) {
  evt.preventDefault();
  addElement(addFormTitleInput.value, addFormLinkInput.value, true);
  togglePopup(popupAddForm);
}

// Переключает состояние лайка на карточке
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

// Добавляет одну карточку с заданными названием и адресом картинки
function addElement(elementTitle, elementImageSrc, prepend = false) {
  const elementTemplate = document.querySelector('#element').content;
  const elementList = document.querySelector('.elements__list');

  // Клонируем содержимое тега template
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  // Наполняем копию содержимым
  element.querySelector('.element__image').alt = elementTitle;
  element.querySelector('.element__title').textContent = elementTitle;
  element.querySelector('.element__image').src = elementImageSrc;

  // Добавляем обработчики событий
  element.querySelector('.element__image').addEventListener('click', openImageView);
  element.querySelector('.element__like-btn').addEventListener('click', toggleLike);
  element.querySelector('.element__trash-btn').addEventListener('click', deleteElement);

  // Добавляем на страницу в начало или конец списка в зависимости от аргумента prepend (true/false)
  if (prepend) {
    elementList.prepend(element);
  } else {
    elementList.append(element);
  }
}

function deleteElement(evt) {
  evt.target.closest('.element').remove();
}

// Заполняет страницу начальным набором карточек, вызывая addElement в цикле
function fillPage() {
  initialCards.forEach(function(card) {
    addElement(card.name, card.link);
  });
}

// Добавляем обработчики событий
editBtn.addEventListener('click', openEditForm);
addBtn.addEventListener('click', openAddForm);
closeBtns.forEach(btn => {
  btn.addEventListener('click', closePopup);
});
editForm.addEventListener('submit', submitEditForm);
editForm.addEventListener("keypress", function onEvent(evt) {
  if (evt.key === "Enter") {
    submitEditForm(evt);
  }
});
addForm.addEventListener('submit', submitAddForm);
addForm.addEventListener("keypress", function onEvent(evt) {
  if (evt.key === "Enter") {
    submitAddForm(evt);
  }
});

// Заполняем страницу начальным набором карточек
fillPage();
