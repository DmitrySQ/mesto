export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = nameSelector;
    this._info = infoSelector;
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