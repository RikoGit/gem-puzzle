/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/Game.js":
/*!****************************!*\
  !*** ./components/Game.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./components/Popup.js\");\n/* harmony import */ var _Timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer.js */ \"./components/Timer.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ \"./utils.js\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n\n\nvar Game = /*#__PURE__*/function () {\n  function Game(_ref) {\n    var _ref$parentNode = _ref.parentNode,\n        parentNode = _ref$parentNode === void 0 ? document.body : _ref$parentNode,\n        _ref$width = _ref.width,\n        width = _ref$width === void 0 ? 4 : _ref$width,\n        _ref$sizes = _ref.sizes,\n        sizes = _ref$sizes === void 0 ? [2, 3, 4, 5, 8] : _ref$sizes;\n\n    _classCallCheck(this, Game);\n\n    this.width = width;\n    this.sizes = sizes;\n    this.tiles = [];\n    this.moves = 0;\n    this.getTiles();\n    this.nextToEmptyTiles = new Map();\n    this.targetTile = null;\n    this.transitionDuration = 1500;\n    this.timerId = 0;\n    this.isTileMoving = false;\n    this.emptyTileIndex = this.tiles.indexOf();\n    this.domElement = document.createElement('div');\n    this.createDomElement().renderTo(parentNode);\n    this.timer = new _Timer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      parentNode: document.querySelector('.time')\n    });\n    this.popup = new _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      parentNode: parentNode\n    });\n    this.timer.show();\n    this.shuffle();\n    this.addGridTemplateAreas();\n    this.onClickToolbar().onClickSizes().onClickTile();\n  }\n\n  _createClass(Game, [{\n    key: \"getTiles\",\n    value: function getTiles() {\n      this.tiles = Array(this.width * this.width).fill().map(function (value, index) {\n        return index;\n      });\n    }\n  }, {\n    key: \"onClickToolbar\",\n    value: function onClickToolbar() {\n      var _this = this;\n\n      document.querySelector('.toolbar').addEventListener('click', function (event) {\n        var target = event.target;\n\n        if (target.classList.contains('button_type_start')) {\n          _this.resetMoves();\n\n          _this.start();\n        }\n\n        if (target.classList.contains('button_type_stop')) {\n          _this.stop();\n        }\n      });\n      return this;\n    }\n  }, {\n    key: \"onClickSizes\",\n    value: function onClickSizes() {\n      var _this2 = this;\n\n      document.querySelector('.sizes-container').addEventListener('click', function (event) {\n        var target = event.target;\n\n        if (target.classList.contains('sizes')) {\n          if (Number(target.dataset.size) === _this2.width) {\n            return;\n          }\n\n          _this2.reset();\n\n          _this2.start(Number(target.dataset.size));\n        }\n      });\n      return this;\n    }\n  }, {\n    key: \"getResultTime\",\n    value: function getResultTime() {\n      var time = new Date(this.timer.result);\n      return \"\".concat(String(time.getMinutes()).padStart(2, 0), \" : \").concat(String(time.getSeconds()).padStart(2, 0));\n    }\n  }, {\n    key: \"checkResult\",\n    value: function checkResult() {\n      var array = this.tiles.slice(0, -1);\n      var previousValue = -Infinity;\n\n      var _iterator = _createForOfIteratorHelper(array),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var currentValue = _step.value;\n\n          if (currentValue <= previousValue) {\n            return false;\n          }\n\n          previousValue = currentValue;\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      if (array.length === 1 + array.at(-1) - array[0]) {\n        this.popup.show(\"\\xABHooray! You solved the puzzle in \".concat(this.getResultTime(), \"  and \").concat(this.moves, \" moves!\\xBB\"));\n        this.stop();\n      }\n    }\n  }, {\n    key: \"onClickTile\",\n    value: function onClickTile() {\n      var _this3 = this;\n\n      document.querySelector('.container').addEventListener('click', function (event) {\n        var target = event.target;\n        if (_this3.isTileMoving) return;\n\n        _this3.getNextToEmptyTiles();\n\n        var tileNumber = Number(target.dataset.number);\n\n        if (_this3.nextToEmptyTiles.has(tileNumber)) {\n          _this3.targetTile = target;\n\n          var direction = _this3.nextToEmptyTiles.get(tileNumber);\n\n          target.classList.add(\"tile_direction_\".concat(direction));\n          _this3.isTileMoving = true;\n\n          var index = _this3.tiles.indexOf(tileNumber);\n\n          _this3.setMoves(_this3.moves + 1);\n\n          _this3.timerId = setTimeout(function () {\n            target.classList.remove(\"tile_direction_\".concat(direction));\n            _this3.targetTile = null;\n            var _ref2 = [_this3.tiles[_this3.emptyTileIndex], _this3.tiles[index]];\n            _this3.tiles[index] = _ref2[0];\n            _this3.tiles[_this3.emptyTileIndex] = _ref2[1];\n\n            _this3.nextToEmptyTiles.clear();\n\n            _this3.addGridTemplateAreas();\n\n            _this3.isTileMoving = false;\n\n            _this3.checkResult();\n          }, _this3.transitionDuration);\n\n          _this3.timer.start(); //this.checkResult();\n\n        } else {\n          _this3.nextToEmptyTiles.clear();\n        }\n      }, true);\n      return this;\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      this.timer.stop();\n      return this;\n    }\n  }, {\n    key: \"addGridTemplateAreas\",\n    value: function addGridTemplateAreas() {\n      document.querySelector('.container').style.gridTemplateAreas = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getGridTemplateAreas)(this.tiles, this.width);\n      return this;\n    }\n  }, {\n    key: \"getNextToEmptyTiles\",\n    value: function getNextToEmptyTiles() {\n      this.emptyTileIndex = this.tiles.indexOf(0);\n\n      if ((this.emptyTileIndex + 1) % this.width && this.emptyTileIndex % this.width) {\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - 1], 'right');\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + 1], 'left');\n      } else if (!((this.emptyTileIndex + 1) % this.width)) {\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - 1], 'right');\n      } else {\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + 1], 'left');\n      }\n\n      if (this.emptyTileIndex >= this.width && this.emptyTileIndex < this.tiles.length - this.width) {\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - this.width], 'bottom');\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + this.width], 'top');\n      } else if (this.emptyTileIndex < this.width) {\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex + this.width], 'top');\n      } else {\n        this.nextToEmptyTiles.set(this.tiles[this.emptyTileIndex - this.width], 'bottom');\n      }\n    }\n  }, {\n    key: \"getTilesElements\",\n    value: function getTilesElements(size) {\n      return Array(size * size).fill().reduce(function (str, value, index) {\n        str = str + \"<div class=\\\"tile\\\" data-number=\".concat(index, \" style=\\\"grid-area:tile\").concat(index, \"\\\">\").concat(index, \"</div>\");\n        return str;\n      }, '');\n    }\n  }, {\n    key: \"getSizesButtonsElements\",\n    value: function getSizesButtonsElements() {\n      return this.sizes.reduce(function (str, size) {\n        str = str + \"<button class='sizes' data-size=\".concat(size, \">\").concat(size, \" x \").concat(size, \"</button>\");\n        return str;\n      }, '');\n    }\n  }, {\n    key: \"createDomElement\",\n    value: function createDomElement() {\n      this.domElement.innerHTML = \"<h1>Gem Puzzle</h1><div class=\\\"toolbar\\\" aria-label='toolbar'>    <button class='button button_type_start'>Shuffle and start</button></div>    <p>Moves: <span class=\\\"moves\\\">\".concat(this.moves, \"</span> </p>\\n    <p>Time: <span class=\\\"time\\\"></span></p>    <div class='container' data-size=\\\"4\\\">\").concat(this.getTilesElements(8), \"</div>    <div class=\\\"sizes-container\\\">\").concat(this.getSizesButtonsElements(), \"</div>\");\n      return this;\n    }\n  }, {\n    key: \"renderTo\",\n    value: function renderTo(parentNode) {\n      parentNode.appendChild(this.domElement);\n      return this;\n    }\n  }, {\n    key: \"shuffle\",\n    value: function shuffle() {\n      this.tiles.sort(function () {\n        return 0.5 - Math.random();\n      });\n      this.getNextToEmptyTiles();\n      return this;\n    }\n  }, {\n    key: \"start\",\n    value: function start(width) {\n      if (width) {\n        this.reset();\n        this.width = Number(width);\n        this.getTiles();\n        document.querySelector('.container').dataset.size = this.width;\n      }\n\n      this.resetTileTranslate(); // this.popup.hide();\n\n      this.timer.stop();\n      this.timer.show();\n      this.shuffle();\n      this.addGridTemplateAreas();\n    }\n  }, {\n    key: \"setMoves\",\n    value: function setMoves(value) {\n      this.moves = value;\n      document.querySelector('.moves').textContent = this.moves;\n    }\n  }, {\n    key: \"resetMoves\",\n    value: function resetMoves() {\n      this.moves = 0;\n      document.querySelector('.moves').textContent = this.moves;\n    }\n  }, {\n    key: \"resetTileTranslate\",\n    value: function resetTileTranslate() {\n      clearTimeout(this.timerId);\n      this.nextToEmptyTiles.clear();\n      this.isTileMoving = false;\n      if (!this.targetTile) return;\n      this.targetTile.classList.remove('tile_direction_left', 'tile_direction_right', 'tile_direction_top', 'tile_direction_bottom');\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      this.popup.hide();\n      this.timer.stop();\n      this.nextToEmptyTiles.clear();\n      this.tiles = [];\n      this.resetMoves();\n      return this;\n    }\n  }]);\n\n  return Game;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://gem-puzzle/./components/Game.js?");

/***/ }),

/***/ "./components/Popup.js":
/*!*****************************!*\
  !*** ./components/Popup.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nvar Popup = /*#__PURE__*/function () {\n  function Popup(_ref) {\n    var onClick = _ref.onClick,\n        _ref$parentNode = _ref.parentNode,\n        parentNode = _ref$parentNode === void 0 ? document.body : _ref$parentNode;\n\n    _classCallCheck(this, Popup);\n\n    this.domElement = document.createElement('div');\n    this.createDomElement().setDomElementClass().renderTo(parentNode); //if (onClick) {\n    //  document.getElementById(Popup.CLASSES.buttonid).addEventListener('click', onClick);\n    //}\n  }\n\n  _createClass(Popup, [{\n    key: \"createDomElement\",\n    value: function createDomElement() {\n      this.domElement.innerHTML = \"<h2 class='popup__title'>\\xABHooray! You solved the puzzle!\\xBB</h2>\";\n      return this;\n    }\n  }, {\n    key: \"setDomElementClass\",\n    value: function setDomElementClass() {\n      this.domElement.className = 'popup';\n      return this;\n    }\n  }, {\n    key: \"renderTo\",\n    value: function renderTo(parentNode) {\n      parentNode.appendChild(this.domElement);\n      return this;\n    }\n  }, {\n    key: \"show\",\n    value: function show(text) {\n      this.domElement.classList.add('popup_state_open');\n\n      if (text) {\n        document.querySelector('.popup__title').textContent = text;\n      }\n\n      return this;\n    }\n  }, {\n    key: \"hide\",\n    value: function hide() {\n      if (this.domElement) {\n        this.domElement.classList.remove('popup_state_open');\n      }\n\n      return this;\n    }\n  }]);\n\n  return Popup;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);\n\n//# sourceURL=webpack://gem-puzzle/./components/Popup.js?");

/***/ }),

/***/ "./components/Timer.js":
/*!*****************************!*\
  !*** ./components/Timer.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nvar Timer = /*#__PURE__*/function () {\n  function Timer(_ref) {\n    var parentNode = _ref.parentNode;\n\n    _classCallCheck(this, Timer);\n\n    this.domElement = document.createElement('span');\n    this.step = 1000;\n    this.timerId = 0;\n    this.result = 0;\n\n    if (parentNode) {\n      this.renderTo(parentNode);\n    }\n  }\n\n  _createClass(Timer, [{\n    key: \"renderTo\",\n    value: function renderTo(parentNode) {\n      parentNode.appendChild(this.domElement);\n    }\n  }, {\n    key: \"show\",\n    value: function show() {\n      var time = new Date(this.result);\n      this.domElement.textContent = \"\".concat(String(time.getMinutes()).padStart(2, 0), \" : \").concat(String(time.getSeconds()).padStart(2, 0));\n      this.result += this.step;\n      /*if (this.result > ) { */\n\n      return this;\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      if (!this.timerId) {\n        this.timerId = setInterval(function () {\n          return _this.show();\n        }, 1000);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this.timerId) {\n        clearInterval(this.timerId);\n      }\n\n      this.timerId = 0;\n      this.result = 0;\n      return this;\n    }\n  }]);\n\n  return Timer;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);\n\n//# sourceURL=webpack://gem-puzzle/./components/Timer.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Game.js */ \"./components/Game.js\");\n\nnew _components_Game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({});\n\n//# sourceURL=webpack://gem-puzzle/./index.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getGridTemplateAreas\": () => (/* binding */ getGridTemplateAreas)\n/* harmony export */ });\nvar getGridTemplateAreas = function getGridTemplateAreas(indices, number) {\n  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"'\";\n  return indices.reduce(function (str, indicesItem, index) {\n    if (!(index % number)) {\n      str = \"\".concat(str, \" \").concat(separator);\n    }\n\n    str = \"\".concat(str, \" tile\").concat(indicesItem);\n\n    if (!((index + 1) % number)) {\n      str = \"\".concat(str, \" \").concat(separator);\n    }\n\n    return str;\n  }, '');\n};\n\n//# sourceURL=webpack://gem-puzzle/./utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;