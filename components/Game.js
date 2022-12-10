import Popup from './Popup.js';
import Timer from './Timer.js';
import {getGridTemplateAreas} from '../utils.js';

class Game {
  constructor({parentNode = document.body, width = 4, sizes = [2, 3, 4, 5, 8]}) {
    this.parentNode = parentNode;
    this.domElement = null;
    this.width = width;
    this.sizes = sizes;
    this.tiles = [];
    this.resultTiles = [];
    this.moves = 0;
    this.getTiles();
    this.nextToEmptyTiles = new Map();
    this.target = null;
    this.targetTile = null;
    this.transitionDuration = 300;
    this.timerId = 0;
    this.isTileMoving = false;
    this.emptyTileIndex = this.tiles.indexOf();
    this.popup = null;
    this.timer = null;
    this.sound = new Audio();
    this.sound.src = './sound.mp3';
    this.isMute = false;
    this.animationEndPromise = Promise.resolve();
    this.isGameOver = false;
    this.init();
  }

  init() {
    this.domElement = document.createElement('div');
    this.domElement.className = 'app';
    this.createDomElement().renderTo(this.parentNode);
    this.popup = new Popup({
      parentNode: this.domElement,
    });
    this.timer = new Timer({
      parentNode: document.querySelector('.time'),
    });
    this.timer.show();
    this.shuffle();
    this.addGridTemplateAreas();
    this.onClickHandler();
  }

  getTiles() {
    this.resultTiles = Array(this.width * this.width)
      .fill()
      .map((value, index) => index + 1);
    this.resultTiles[this.resultTiles.length - 1] = 0;
    this.tiles = [...this.resultTiles];
  }

  onClickHandler() {
    document.querySelector('.app').addEventListener('click', async (event) => {
      const {target} = event;
      if (
        target.classList.contains('button_type_start') ||
        target.classList.contains('popup__button_type_start')
      ) {
        this.start();
      }
      if (target.classList.contains('button_type_stop')) {
        this.stop();
      }
      if (target.classList.contains('sizes-container__button')) {
        if (Number(target.dataset.size) === this.width) {
          return;
        }
        document
          .querySelector('.sizes-container__button[aria-checked="true"]')
          .setAttribute('aria-checked', false);
        target.setAttribute('aria-checked', true);
        this.reset();
        this.start(Number(target.dataset.size));
      }

      if (target.classList.contains('button_type_sound')) {
        if (this.isMute) {
          target.setAttribute('aria-pressed', false);
          this.isMute = false;
        } else {
          target.setAttribute('aria-pressed', true);
          this.isMute = true;
        }
      }

      if (target.classList.contains('tile')) {
        if (this.target === target && this.isTileMoving) return;

        await this.animationEndPromise;

        if (this.isGameOver) return;

        if (this.isTileMoving) return;

        this.target = target;
        this.getNextToEmptyTiles();
        const tileNumber = Number(target.dataset.number);
        if (this.nextToEmptyTiles.has(tileNumber)) {
          this.targetTile = target;
          const direction = this.nextToEmptyTiles.get(tileNumber);
          target.classList.add(`tile_direction_${direction}`);
          if (!this.isMute) {
            this.sound.currentTime = 0;
            this.sound.play();
          }
          this.isTileMoving = true;
          let index = this.tiles.indexOf(tileNumber);
          this.setMoves(this.moves + 1);
          this.animationEndPromise = new Promise((resolve) => {
            this.timerId = setTimeout(() => {
              target.classList.remove(`tile_direction_${direction}`);
              this.sound.pause();
              this.sound.currentTime = 0;
              [this.tiles[index], this.tiles[this.emptyTileIndex]] = [
                this.tiles[this.emptyTileIndex],
                this.tiles[index],
              ];
              this.nextToEmptyTiles.clear();
              this.addGridTemplateAreas();
              this.isTileMoving = false;
              this.checkResult();
              this.targetTile = null;
              resolve();
            }, this.transitionDuration);
          });
          this.timer.start();
        } else {
          this.nextToEmptyTiles.clear();
        }
      }
    });
  }

  getResultTime() {
    const time = new Date(this.timer.result - this.timer.step);

    return `${String(time.getMinutes()).padStart(2, 0)} : ${String(time.getSeconds()).padStart(
      2,
      0,
    )}`;
  }

  checkResult() {
    document
      .querySelectorAll('.tile_correct')
      .forEach((tile) => tile.classList.remove('tile_correct'));
    for (let index = 0; index < this.tiles.length; index++) {
      if (this.tiles[index] === this.resultTiles[index]) {
        document.querySelector(`.tile[data-number='${index + 1}']`).classList.add('tile_correct');
        if (index === this.tiles.length - 1) {
          this.isGameOver = true;
          this.resetTileTranslate();
          this.popup.show(
            `«Hooray! You solved the puzzle in <br/>${this.getResultTime()}  and ${
              this.moves
            } moves!»`,
          );
          this.stop();
        }
      } else return;
    }
  }

  stop() {
    this.timer.stop();

    return this;
  }

  addGridTemplateAreas() {
    document.querySelector('.container').style.gridTemplateAreas = getGridTemplateAreas(
      this.tiles,
      this.width,
    );

    return this;
  }

  getNextToEmptyTiles() {
    this.emptyTileIndex = this.tiles.indexOf(0);
    if ((this.emptyTileIndex + 1) % this.width && this.emptyTileIndex % this.width) {
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - 1], 'right');
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + 1], 'left');
    } else if (!((this.emptyTileIndex + 1) % this.width)) {
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - 1], 'right');
    } else {
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + 1], 'left');
    }
    if (this.emptyTileIndex >= this.width && this.emptyTileIndex < this.tiles.length - this.width) {
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - this.width], 'bottom');
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + this.width], 'top');
    } else if (this.emptyTileIndex < this.width) {
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + this.width], 'top');
    } else {
      this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - this.width], 'bottom');
    }
  }

  getTilesElements(size) {
    return Array(size * size)
      .fill()
      .reduce((str, value, index) => {
        str =
          str +
          `<div class="tile" data-number=${index} style="grid-area:tile${index}">${index}</div>`;
        return str;
      }, '');
  }

  getSizesButtonsElements() {
    return this.sizes.reduce((str, size) => {
      str =
        str +
        `<button class='sizes-container__button' type='button' role='radio' data-size=${size} aria-checked='${
          size === this.width
        }'>${size} x ${size}</button>`;
      return str;
    }, '');
  }

  createDomElement() {
    this.domElement.innerHTML = `<h1>Gem Puzzle</h1><div class="toolbar" aria-label='toolbar'>\
    <button class='button button_type_start' type='button'>Shuffle and start</button>\
    <button class='button button_type_sound' type='button' aria-pressed='false'>Mute</button></div>\
    <p>Moves: <span class="moves">${this.moves}</span> </p>
    <p>Time: <span class="time"></span></p>\
    <div class='container' data-size="${this.width}">${this.getTilesElements(
      this.sizes.at(-1),
    )}</div>\
    <div class="sizes-container">${this.getSizesButtonsElements()}</div>`;

    return this;
  }

  renderTo(parentNode) {
    parentNode.appendChild(this.domElement);

    return this;
  }

  shuffle() {
    this.tiles.sort(() => 0.5 - Math.random());
    this.getNextToEmptyTiles();

    return this;
  }

  start(width) {
    this.isGameOver = false;
    this.animationEndPromise = Promise.resolve();
    document
      .querySelectorAll('.tile_correct')
      .forEach((tile) => tile.classList.remove('tile_correct'));
    this.popup.hide();
    if (width) {
      this.reset();
      this.width = Number(width);
      this.getTiles();
      document.querySelector('.container').dataset.size = this.width;
    }
    this.resetMoves();
    this.resetTileTranslate();
    this.timer.stop();
    this.timer.show();
    this.shuffle();
    this.addGridTemplateAreas();
  }

  setMoves(value) {
    this.moves = value;
    document.querySelector('.moves').textContent = this.moves;
  }

  resetMoves() {
    this.moves = 0;
    document.querySelector('.moves').textContent = this.moves;
  }

  resetTileTranslate() {
    clearTimeout(this.timerId);
    this.nextToEmptyTiles.clear();
    this.isTileMoving = false;
    if (!this.targetTile) return;

    this.targetTile.classList.remove(
      'tile_direction_left',
      'tile_direction_right',
      'tile_direction_top',
      'tile_direction_bottom',
    );
  }

  reset() {
    this.popup.hide();
    this.timer.stop();
    this.nextToEmptyTiles.clear();
    this.tiles = [];
    this.resetMoves();

    return this;
  }
}

export default Game;
