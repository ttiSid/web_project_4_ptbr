export { api };

export default class Api {
  constructor(options) {
    (this.baseUrl = options.baseUrl),
      (this.headers = options.headers),
      (this.authorization = options.headers.authorization);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_cohort_03",
  headers: {
    authorization: "cd11ea9c-4334-427e-8070-b6b80559cc56",
    "Content-Type": "application/json",
  },
});
