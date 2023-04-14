export default class UserInfo {
  constructor({ userName, userAbout }) {
    this.userName = document.querySelector(userName);
    this.userAbout = document.querySelector(userAbout);
  }

  /* Coleta os dados do perfil */

  getUserInfo = () => {
    this._getProfileName = document
      .querySelector("#modal-profile")
      .content.querySelector("#profile-name");

    this._getProfileAbout = document
      .querySelector("#modal-profile")
      .content.querySelector("#profile-description");

    this._getProfileName.value = this.userName.textContent;
    this._getProfileAbout.value = this.userAbout.textContent;
  };

  /* Edita os dados do perfil */

  editProfile = () => {
    this._getProfileName = document.querySelector("#profile-name").value;
    this._getProfileAbout = document.querySelector(
      "#profile-description"
    ).value;

    this.userName.textContent = this._getProfileName;
    this.userAbout.textContent = this._getProfileAbout;
  };
}
