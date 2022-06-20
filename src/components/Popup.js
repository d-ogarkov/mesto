export class Popup {
  constructor(selector) {
    this._container = document.querySelector(selector);
  }

  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    // Закрытие по нажатию Esc
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._container.addEventListener('mousedown', (evt) => {
      // Закрытие по клику на область вне попапа
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      // Закрытие по клику на крестик
      if (evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    })
  }
}
