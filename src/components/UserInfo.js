export default class UserInfo {
  constructor({ userName, userAbout }) {
    this.userName = userName;
    this.userAbout = userAbout;
  }

  /* Coleta os dados do perfil */

  getUserInfo = () => {
    this._getProfileName = document
      .querySelector("#modal-profile")
      .content.querySelector("#profile-name");

    this._getProfileAbout = document
      .querySelector("#modal-profile")
      .content.querySelector("#profile-description");

    this._getProfileName.value =
      document.querySelector(".profile__name").textContent;
    this._getProfileAbout.value =
      document.querySelector(".profile__about-me").textContent;
  };

  /* Edita os dados do perfil */

  editProfile = () => {
    this._getProfileName = document.querySelector("#profile-name").value;
    this._getProfileAbout = document.querySelector(
      "#profile-description"
    ).value;

    document.querySelector(".profile__name").textContent = this._getProfileName;
    document.querySelector(".profile__about-me").textContent =
      this._getProfileAbout;

    const userData = {
      name: this._getProfileName,
      about: this._getProfileAbout,
    };

    return userData;
  };
}
