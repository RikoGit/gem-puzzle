class Popup {
  constructor({parentNode = document.body}) {
    this.domElement = document.createElement('div');
    this.createDomElement().setDomElementClass().renderTo(parentNode);
  }

  createDomElement() {
    this.domElement.innerHTML = `<article class='popup__content'>\
    <h2 class='popup__title'>«Hooray! <br/>You solved the puzzle!»</h2>\
    <button class='popup__button popup__button_type_start' \
    type='button'>try again</button></article>`;

    return this;
  }

  setDomElementClass() {
    this.domElement.className = 'popup';

    return this;
  }

  renderTo(parentNode) {
    parentNode.appendChild(this.domElement);

    return this;
  }

  show(text) {
    this.domElement.classList.add('popup_state_open');
    if (text) {
      document.querySelector('.popup__title').innerHTML = text;
    }

    return this;
  }

  hide() {
    if (this.domElement) {
      this.domElement.classList.remove('popup_state_open');
    }

    return this;
  }
}

export default Popup;
