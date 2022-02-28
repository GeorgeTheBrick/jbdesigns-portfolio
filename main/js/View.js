export default class View {
  _data;

  render(data) {
    this._data = data;

    const markup = this.generateMarkup(data);

    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }
}
