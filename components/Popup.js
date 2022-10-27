class Popup {
  constructor({onClick, parentNode = document.body}) {
    this.domElement = document.createElement('div');
    this.createDomElement().setDomElementClass().renderTo(parentNode);
    //if (onClick) {
    //  document.getElementById(Popup.CLASSES.buttonid).addEventListener('click', onClick);
    //}
  }

  createDomElement() {
    this.domElement.innerHTML = `<h2 class='popup__title'>«Hooray! You solved the puzzle!»</h2>`;

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
      document.querySelector('.popup__title').textContent = text;
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
