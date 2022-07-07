// Класс Card: карточка со ссылкой на картинку, текстом, кнопками лайка и удаления
export class Card {

  // Конструктор принимает данные карточки, селектор шаблона и внешнюю функцию просмотра изображения
  constructor(data, userId, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    // Сохраняем id, id создателя, название, URL картинки, селектор шаблона карточки,
    // лайки, обработчик просмотра, обработчик нажатия кнопки удаления
    this._id = data._id; // id самой карточки
    this._ownerId = data.owner._id; // id пользователя, который создал карточку
    this._title = data.name;
    this._imageSrc = data.link;
    this._likes = data.likes;
    this._userId = userId; // id текущего пользователя
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    // Привязка метода к контексту класса
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._handleToggleLike = this._handleToggleLike.bind(this);
    this._handleRefreshLikes = this._handleRefreshLikes.bind(this);
  }

  // Возвращает разметку из шаблона в HTML
  _getTemplate() {
    const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return element;
  }

  // Обрабатывает нажатие кнопки лайка (переключает состояние)
  _handleToggleLike() {
    //this._elementLikeBtn.classList.toggle('element__like-btn_active');
    const newData = this._handleCardLike(this._handleRefreshLikes, { cardId: this._id, userLikes: this._userLikes });
  }

  // Обновляет состояние кнопки лайка и количество лайков на странице
  _refreshLikes() {
    // Если среди лайков есть лайк от текущего пользователя, то надо изобразить активное сердечко
    if (this._likes.some((like) => {
      return like._id === this._userId;
    })) {
      // Текущий пользователь уже лайкнул эту карточку
      this._userLikes = true;
      this._elementLikeBtn.classList.add('element__like-btn_active');
    } else {
      // Текущий пользователь еще не лайкнул эту карточку
      this._userLikes = false;
      this._elementLikeBtn.classList.remove('element__like-btn_active');
    }
    this._elementLikeCounter.textContent = this._likes.length;
  }

  _handleRefreshLikes(data) {
    this._likes = data.likes;
    this._refreshLikes();
  }

  // Обрабатывает удаление карточки после его подтверждения через handleCardDelete
  _handleRemoveCard() {
    this._element.remove();
  }

  // Добавляет к карточке обработчики событий
  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._imageSrc, this._title);
    });
    this._elementLikeBtn.addEventListener('click', () => {
      this._handleToggleLike();
    });
    this._elementTrashBtn.addEventListener('click', () => {
      // Вызываем внешний обработчик нажатия кнопки удаления, передавая ему внутренний обработчик удаления.
      // Внутренний обработчик будет вызван, если пользователь подтвердит удаление.
      // Также передаем id карточки, чтобы внешний обработчик мог его использовать
      this._handleCardDelete(this._handleRemoveCard, this._id);
    });
  }

  // Возвращает полностью подготовленную карточку
  generateCard() {
    // Создаем экземпляр карточки из шаблона
    this._element = this._getTemplate();

    // Находим в DOM все, что нам понадобится в карточке
    this._elementTitle = this._element.querySelector('.element__title')
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._elementTrashBtn = this._element.querySelector('.element__trash-btn');

    // Если id создателя карточки не равен id текущего пользователя, убираем кнопку удаления из этой карточки
    if (this._ownerId !== this._userId) {
      this._elementTrashBtn.remove();
    }

    // Наполняем карточку содержимым
    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._imageSrc;
    this._elementImage.alt = this._title;
    this._refreshLikes();

    // Добавляем обработчики событий
    this._setEventListeners();

    return this._element;
  }
}
