export class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar) {
    this._selectorName = selectorName;
    this._selectorAbout = selectorAbout;
    this._selectorAvatar = selectorAvatar;
    this._nameContainer = document.querySelector(this._selectorName);
    this._aboutContainer = document.querySelector(this._selectorAbout);
    this._avatarContainer = document.querySelector(this._selectorAvatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameContainer.textContent;
    userInfo.about = this._aboutContainer.textContent;
    return userInfo;
  }

  setAvatar(avatar) {
    this._avatarContainer.style.backgroundImage = `url(${avatar})`;
  }

  setUserInfo({ _id, name, about, avatar }) {
    this._id = _id;
    this._nameContainer.textContent = name;
    this._aboutContainer.textContent = about;
    this.setAvatar(avatar);
  }
}
