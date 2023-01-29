export class UserInfo {
  constructor({nameElement, infoElement}) {
    this._name = nameElement;
    this._info = infoElement;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._info.textContent;

    return userInfo;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._info.textContent = description;
  }
}