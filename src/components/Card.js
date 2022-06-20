// Класс Card: карточка со ссылкой на картинку, текстом, кнопками лайка и удаления
export class Card {

  // Конструктор принимает данные карточки, селектор шаблона и внешнюю функцию просмотра изображения
  constructor(data, cardSelector, handleCardClick) {
    // Сохраняем название, URL картинки, селектор шаблона карточки, обработчик просмотра
    this._title = data.title;
    this._imageSrc = data.imageSrc;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Возвращает разметку из шаблона в HTML
  _getTemplate() {
    const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return element;
  }

  // Обрабатывает нажатие кнопки лайка (переключает состояние)
  _handleToggleLike() {
    this._elementLikeBtn.classList.toggle('element__like-btn_active');
  }

  // Обрабатывает нажатие кнопки удаления (удаляет карточку)
  _handleClickRemove() {
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
      this._handleClickRemove();
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
    this._elementTrashBtn = this._element.querySelector('.element__trash-btn');

    // Наполняем карточку содержимым
    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._imageSrc;
    this._elementImage.alt = this._title;

    // Добавляем обработчики событий
    this._setEventListeners();

    return this._element;
  }
}
