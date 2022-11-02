import Popup from './Popup.js';
import Timer from './Timer.js';
import {getGridTemplateAreas} from '../utils.js';

class Game {
  constructor({parentNode = document.body, width = 4, sizes = [2, 3, 4, 5, 8]}) {
    this.width = width;
    this.sizes = sizes;
    this.tiles = [];
    this.moves = 0;
    this.getTiles();
    this.nextToEmptyTiles = new Map();
    this.targetTile = null;
    this.transitionDuration = 1500;
    this.timerId = 0;
    this.isTileMoving = false;
    this.emptyTileIndex = this.tiles.indexOf();
    this.domElement = document.createElement('div');
    this.createDomElement().renderTo(parentNode);
    this.timer = new Timer({
      parentNode: document.querySelector('.time'),
    });
    this.popup = new Popup({
      parentNode,
    });
    this.timer.show();
    this.shuffle();
    this.addGridTemplateAreas();
    this.onClickToolbar().onClickSizes().onClickTile();
  }

  getTiles() {
    this.tiles = Array(this.width * this.width)
      .fill()
      .map((value, index) => index);
  }

  onClickToolbar() {
    document.querySelector('.toolbar').addEventListener('click', (event) => {
      const {target} = event;
      if (target.classList.contains('button_type_start')) {
        this.resetMoves();
        this.start();
      }
      if (target.classList.contains('button_type_stop')) {
        this.stop();
      }
    });

    return this;
  }

  onClickSizes() {
    document.querySelector('.sizes-container').addEventListener('click', (event) => {
      const {target} = event;
      if (target.classList.contains('sizes')) {
        if (Number(target.dataset.size) === this.width) {
          return;
        }
        this.reset();
        this.start(Number(target.dataset.size));
      }
    });

    return this;
  }

  getResultTime() {
    const time = new Date(this.timer.result);

    return `${String(time.getMinutes()).padStart(2, 0)} : ${String(time.getSeconds()).padStart(
      2,
      0,
    )}`;
  }

  checkResult() {
    let array = this.tiles.slice(0, -1);
    let previousValue = -Infinity;
    for (const currentValue of array) {
      if (currentValue <= previousValue) {
        return false;
      }
      previousValue = currentValue;
    }
    if (array.length === 1 + array.at(-1) - array[0]) {
      this.popup.show(
        `«Hooray! You solved the puzzle in ${this.getResultTime()}  and ${this.moves} moves!»`,
      );
      this.stop();
    }
  }

  onClickTile() {
    document.querySelector('.container').addEventListener(
      'click',
      (event) => {
        const {target} = event;
        if (this.isTileMoving) return;

        this.getNextToEmptyTiles();
        const tileNumber = Number(target.dataset.number);
        if (this.nextToEmptyTiles.has(tileNumber)) {
          this.targetTile = target;
          const direction = this.nextToEmptyTiles.get(tileNumber);
          target.classList.add(`tile_direction_${direction}`);
          this.isTileMoving = true;
          let index = this.tiles.indexOf(tileNumber);
          this.setMoves(this.moves + 1);
          this.timerId = setTimeout(() => {
            target.classList.remove(`tile_direction_${direction}`);
            this.targetTile = null;
            [this.tiles[index], this.tiles[this.emptyTileIndex]] = [
              this.tiles[this.emptyTileIndex],
              this.tiles[index],
            ];
            this.nextToEmptyTiles.clear();
            this.addGridTemplateAreas();
            this.isTileMoving = false;
            this.checkResult();
          }, this.transitionDuration);
          this.timer.start();
          //this.checkResult();
        } else {
          this.nextToEmptyTiles.clear();
        }
      },
      true,
    );

    return this;
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
      str = str + `<button class='sizes' data-size=${size}>${size} x ${size}</button>`;
      return str;
    }, '');
  }

  createDomElement() {
    this.domElement.innerHTML = `<h1>Gem Puzzle</h1><div class="toolbar" aria-label='toolbar'>\
    <button class='button button_type_start'>Shuffle and start</button></div>\
    <p>Moves: <span class="moves">${this.moves}</span> </p>
    <p>Time: <span class="time"></span></p>\
    <div class='container' data-size="4">${this.getTilesElements(8)}</div>\
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
    if (width) {
      this.reset();
      this.width = Number(width);
      this.getTiles();
      document.querySelector('.container').dataset.size = this.width;
    }
    this.resetTileTranslate();
    // this.popup.hide();
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
