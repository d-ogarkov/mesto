import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._container.querySelector('.popup__image');
    this._caption = this._container.querySelector('.popup__caption');
  }

  open(imageSrc, titleText) {
    this._image.src = imageSrc;
    this._image.alt = titleText;
    this._caption.textContent = titleText;
    super.open();
  }
}
