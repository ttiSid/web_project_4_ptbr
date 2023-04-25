export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderer() {
    this._items.then((res) => {
      res.forEach((item) => {
        this._renderer(item);
      });
    });
  }
}
