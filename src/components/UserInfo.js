export class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar) {
    this._nameContainer = document.querySelector(selectorName);
    this._aboutContainer = document.querySelector(selectorAbout);
    this._avatarContainer = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameContainer.textContent;
    userInfo.about = this._aboutContainer.textContent;
    return userInfo;
  }

  setUserInfo({ _id, name, about, avatar }) {
    this.id = _id;
    this._nameContainer.textContent = name;
    this._aboutContainer.textContent = about;
    this._avatarContainer.style.backgroundImage = `url(${avatar})`;
  }
}
