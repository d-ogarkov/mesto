export class UserInfo {
  constructor(selectorName, selectorSubtitle) {
    this._selectorName = selectorName;
    this._selectorSubtitle = selectorSubtitle;
    this._nameContainer = document.querySelector(this._selectorName);
    this._subtitleContainer = document.querySelector(this._selectorSubtitle);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameContainer.textContent;
    userInfo.subtitle = this._subtitleContainer.textContent;
    return userInfo;
  }

  setUserInfo(name, subtitle) {
    this._nameContainer.textContent = name;
    this._subtitleContainer.textContent = subtitle;
  }
}
