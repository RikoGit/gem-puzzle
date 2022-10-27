class Timer {
  constructor({parentNode}) {
    this.domElement = document.createElement('span');
    this.step = 1000;
    this.timerId = 0;
    this.result = 0;
    if (parentNode) {
      this.renderTo(parentNode);
    }
  }

  renderTo(parentNode) {
    parentNode.appendChild(this.domElement);
  }

  show() {
    const time = new Date(this.result);
    this.domElement.textContent = `${String(time.getMinutes()).padStart(2, 0)} : ${String(
      time.getSeconds(),
    ).padStart(2, 0)}`;
    this.result += this.step;
    /*if (this.result > ) { */

    return this;
  }

  start() {
    if (!this.timerId) {
      this.timerId = setInterval(() => this.show(), 1000);
    }

    return this;
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = 0;
    this.result = 0;

    return this;
  }
}

export default Timer;
