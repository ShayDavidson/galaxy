/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _math_helpers = __webpack_require__(3);\n\nvar _galaxy_builder = __webpack_require__(4);\n\nvar config = {\n  rngSeed: 1000,\n  galaxyRadius: 10000,\n  starCount: 5000,\n  spiralArms: 3,\n  spiralCurve: 0.3,\n  coreDensity: 1.3,\n  armSpread: 0.9,\n  armPull: 3.75,\n  spaceColor: \"#000000\",\n  zoom: 0.75\n};\n\nvar stars = [];\n\nvar mainCanvas = document.getElementById(\"main-canvas\");\nvar mainCanvasContext = mainCanvas.getContext(\"2d\");\n\nfunction updateInputs() {\n  Object.keys(config).forEach(function (key) {\n    document.getElementById(key).value = config[key];\n  });\n}\n\nfunction updateStars() {\n  stars = (0, _galaxy_builder.buildGalaxy)(config);\n}\n\nfunction render() {\n  mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);\n  stars.forEach(function (star) {\n    return renderStar(star, mainCanvasContext);\n  });\n}\n\nfunction subscribeToInputChanges() {\n  Array.from(document.getElementsByTagName(\"input\")).forEach(function (element) {\n    element.addEventListener(\"change\", function (ev) {\n      config[ev.target.id] = ev.target.value;\n      updateStars();\n      render();\n    });\n  });\n}\n\nfunction renderStar(star, context) {\n  var _star$pos = star.pos,\n      x = _star$pos.x,\n      y = _star$pos.y;\n\n  if (x === undefined && y === undefined) {\n    var cartesian = (0, _math_helpers.polarToCartesian)(star.pos.r, star.pos.t);\n    x = cartesian.x;\n    y = cartesian.y;\n  }\n  var xInverseLerpValue = (0, _math_helpers.inverseLerp)(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, x);\n  var yInverseLerpValue = (0, _math_helpers.inverseLerp)(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, y);\n  x = 800 * xInverseLerpValue * window.devicePixelRatio;\n  y = 800 * yInverseLerpValue * window.devicePixelRatio;\n  // const size = STAR_SIZE_MAPPINGS[star.size] * window.devicePixelRatio;\n  // const color = STAR_COLOR_MAPPINGS[star.type];\n  var size = 1;\n  var color = \"#fff\";\n  context.fillStyle = color;\n  context.fillRect(x - size / 2, y - size / 2, size, size);\n}\n\nupdateInputs();\nupdateStars();\nrender();\nsubscribeToInputChanges();\n//\n//   starTypesWeights: {\n//     ease: easeOutCubic,\n//     min: {\n//       blue: 100,\n//       blueWhite: 200,\n//       white: 1000,\n//       yellowWhite: 500,\n//       yellow: 1000,\n//       lightOrange: 2000,\n//       orangeRed: 2000,\n//       red: 3\n//     },\n//     max: {\n//       blue: 500,\n//       blueWhite: 3000,\n//       white: 2000,\n//       yellowWhite: 120,\n//       yellow: 10,\n//       lightOrange: 10,\n//       orangeRed: 10,\n//       red: 2\n//     }\n//   },\n//   starSizeWeights: {\n//     ease: linear,\n//     min: {\n//       hypergiant: 10,\n//       supergiant: 5,\n//       giant: 10,\n//       standard: 100,\n//       dwarf: 10\n//     },\n//     max: {\n//       hypergiant: 10,\n//       supergiant: 20,\n//       giant: 5,\n//       standard: 50,\n//       dwarf: 100\n//     }\n//   }\n// };//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz84NzQ5Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX21hdGhfaGVscGVycyA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvbWF0aF9oZWxwZXJzXCIpO1xuXG52YXIgX2dhbGF4eV9idWlsZGVyID0gcmVxdWlyZShcIi4vZ2FsYXh5X2J1aWxkZXJcIik7XG5cbnZhciBjb25maWcgPSB7XG4gIHJuZ1NlZWQ6IDEwMDAsXG4gIGdhbGF4eVJhZGl1czogMTAwMDAsXG4gIHN0YXJDb3VudDogNTAwMCxcbiAgc3BpcmFsQXJtczogMyxcbiAgc3BpcmFsQ3VydmU6IDAuMyxcbiAgY29yZURlbnNpdHk6IDEuMyxcbiAgYXJtU3ByZWFkOiAwLjksXG4gIGFybVB1bGw6IDMuNzUsXG4gIHNwYWNlQ29sb3I6IFwiIzAwMDAwMFwiLFxuICB6b29tOiAwLjc1XG59O1xuXG52YXIgc3RhcnMgPSBbXTtcblxudmFyIG1haW5DYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpO1xudmFyIG1haW5DYW52YXNDb250ZXh0ID0gbWFpbkNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUlucHV0cygpIHtcbiAgT2JqZWN0LmtleXMoY29uZmlnKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXkpLnZhbHVlID0gY29uZmlnW2tleV07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTdGFycygpIHtcbiAgc3RhcnMgPSAoMCwgX2dhbGF4eV9idWlsZGVyLmJ1aWxkR2FsYXh5KShjb25maWcpO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIG1haW5DYW52YXNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBtYWluQ2FudmFzLndpZHRoLCBtYWluQ2FudmFzLmhlaWdodCk7XG4gIHN0YXJzLmZvckVhY2goZnVuY3Rpb24gKHN0YXIpIHtcbiAgICByZXR1cm4gcmVuZGVyU3RhcihzdGFyLCBtYWluQ2FudmFzQ29udGV4dCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdWJzY3JpYmVUb0lucHV0Q2hhbmdlcygpIHtcbiAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgY29uZmlnW2V2LnRhcmdldC5pZF0gPSBldi50YXJnZXQudmFsdWU7XG4gICAgICB1cGRhdGVTdGFycygpO1xuICAgICAgcmVuZGVyKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTdGFyKHN0YXIsIGNvbnRleHQpIHtcbiAgdmFyIF9zdGFyJHBvcyA9IHN0YXIucG9zLFxuICAgICAgeCA9IF9zdGFyJHBvcy54LFxuICAgICAgeSA9IF9zdGFyJHBvcy55O1xuXG4gIGlmICh4ID09PSB1bmRlZmluZWQgJiYgeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGNhcnRlc2lhbiA9ICgwLCBfbWF0aF9oZWxwZXJzLnBvbGFyVG9DYXJ0ZXNpYW4pKHN0YXIucG9zLnIsIHN0YXIucG9zLnQpO1xuICAgIHggPSBjYXJ0ZXNpYW4ueDtcbiAgICB5ID0gY2FydGVzaWFuLnk7XG4gIH1cbiAgdmFyIHhJbnZlcnNlTGVycFZhbHVlID0gKDAsIF9tYXRoX2hlbHBlcnMuaW52ZXJzZUxlcnApKC1jb25maWcuZ2FsYXh5UmFkaXVzIC8gY29uZmlnLnpvb20sIGNvbmZpZy5nYWxheHlSYWRpdXMgLyBjb25maWcuem9vbSwgeCk7XG4gIHZhciB5SW52ZXJzZUxlcnBWYWx1ZSA9ICgwLCBfbWF0aF9oZWxwZXJzLmludmVyc2VMZXJwKSgtY29uZmlnLmdhbGF4eVJhZGl1cyAvIGNvbmZpZy56b29tLCBjb25maWcuZ2FsYXh5UmFkaXVzIC8gY29uZmlnLnpvb20sIHkpO1xuICB4ID0gODAwICogeEludmVyc2VMZXJwVmFsdWUgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgeSA9IDgwMCAqIHlJbnZlcnNlTGVycFZhbHVlICogd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gIC8vIGNvbnN0IHNpemUgPSBTVEFSX1NJWkVfTUFQUElOR1Nbc3Rhci5zaXplXSAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAvLyBjb25zdCBjb2xvciA9IFNUQVJfQ09MT1JfTUFQUElOR1Nbc3Rhci50eXBlXTtcbiAgdmFyIHNpemUgPSAxO1xuICB2YXIgY29sb3IgPSBcIiNmZmZcIjtcbiAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgY29udGV4dC5maWxsUmVjdCh4IC0gc2l6ZSAvIDIsIHkgLSBzaXplIC8gMiwgc2l6ZSwgc2l6ZSk7XG59XG5cbnVwZGF0ZUlucHV0cygpO1xudXBkYXRlU3RhcnMoKTtcbnJlbmRlcigpO1xuc3Vic2NyaWJlVG9JbnB1dENoYW5nZXMoKTtcbi8vXG4vLyAgIHN0YXJUeXBlc1dlaWdodHM6IHtcbi8vICAgICBlYXNlOiBlYXNlT3V0Q3ViaWMsXG4vLyAgICAgbWluOiB7XG4vLyAgICAgICBibHVlOiAxMDAsXG4vLyAgICAgICBibHVlV2hpdGU6IDIwMCxcbi8vICAgICAgIHdoaXRlOiAxMDAwLFxuLy8gICAgICAgeWVsbG93V2hpdGU6IDUwMCxcbi8vICAgICAgIHllbGxvdzogMTAwMCxcbi8vICAgICAgIGxpZ2h0T3JhbmdlOiAyMDAwLFxuLy8gICAgICAgb3JhbmdlUmVkOiAyMDAwLFxuLy8gICAgICAgcmVkOiAzXG4vLyAgICAgfSxcbi8vICAgICBtYXg6IHtcbi8vICAgICAgIGJsdWU6IDUwMCxcbi8vICAgICAgIGJsdWVXaGl0ZTogMzAwMCxcbi8vICAgICAgIHdoaXRlOiAyMDAwLFxuLy8gICAgICAgeWVsbG93V2hpdGU6IDEyMCxcbi8vICAgICAgIHllbGxvdzogMTAsXG4vLyAgICAgICBsaWdodE9yYW5nZTogMTAsXG4vLyAgICAgICBvcmFuZ2VSZWQ6IDEwLFxuLy8gICAgICAgcmVkOiAyXG4vLyAgICAgfVxuLy8gICB9LFxuLy8gICBzdGFyU2l6ZVdlaWdodHM6IHtcbi8vICAgICBlYXNlOiBsaW5lYXIsXG4vLyAgICAgbWluOiB7XG4vLyAgICAgICBoeXBlcmdpYW50OiAxMCxcbi8vICAgICAgIHN1cGVyZ2lhbnQ6IDUsXG4vLyAgICAgICBnaWFudDogMTAsXG4vLyAgICAgICBzdGFuZGFyZDogMTAwLFxuLy8gICAgICAgZHdhcmY6IDEwXG4vLyAgICAgfSxcbi8vICAgICBtYXg6IHtcbi8vICAgICAgIGh5cGVyZ2lhbnQ6IDEwLFxuLy8gICAgICAgc3VwZXJnaWFudDogMjAsXG4vLyAgICAgICBnaWFudDogNSxcbi8vICAgICAgIHN0YW5kYXJkOiA1MCxcbi8vICAgICAgIGR3YXJmOiAxMDBcbi8vICAgICB9XG4vLyAgIH1cbi8vIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.polarToCartesian = polarToCartesian;\nexports.cartesianToPolar = cartesianToPolar;\nexports.mod = mod;\nexports.lerp = lerp;\nexports.inverseLerp = inverseLerp;\nexports.clamp = clamp;\nfunction polarToCartesian(r, t) {\n  var x = r * Math.cos(t);\n  var y = r * Math.sin(t);\n  return { x: x, y: y };\n}\n\nfunction cartesianToPolar(x, y) {\n  var r = Math.sqrt(x * x + y * y);\n  var t = Math.atan2(y, x);\n  return { r: r, t: t };\n}\n\nfunction mod(i, n) {\n  return (i % n + n) % n;\n}\n\nfunction lerp(min, max, t) {\n  return min * (1 - t) + max * t;\n}\n\nfunction inverseLerp(min, max, val) {\n  return (val - min) / (max - min);\n}\n\nfunction clamp(min, val, max) {\n  return Math.max(min, Math.min(val, max));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL21hdGhfaGVscGVycy5qcz8yNTA0Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wb2xhclRvQ2FydGVzaWFuID0gcG9sYXJUb0NhcnRlc2lhbjtcbmV4cG9ydHMuY2FydGVzaWFuVG9Qb2xhciA9IGNhcnRlc2lhblRvUG9sYXI7XG5leHBvcnRzLm1vZCA9IG1vZDtcbmV4cG9ydHMubGVycCA9IGxlcnA7XG5leHBvcnRzLmludmVyc2VMZXJwID0gaW52ZXJzZUxlcnA7XG5leHBvcnRzLmNsYW1wID0gY2xhbXA7XG5mdW5jdGlvbiBwb2xhclRvQ2FydGVzaWFuKHIsIHQpIHtcbiAgdmFyIHggPSByICogTWF0aC5jb3ModCk7XG4gIHZhciB5ID0gciAqIE1hdGguc2luKHQpO1xuICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG59XG5cbmZ1bmN0aW9uIGNhcnRlc2lhblRvUG9sYXIoeCwgeSkge1xuICB2YXIgciA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgdmFyIHQgPSBNYXRoLmF0YW4yKHksIHgpO1xuICByZXR1cm4geyByOiByLCB0OiB0IH07XG59XG5cbmZ1bmN0aW9uIG1vZChpLCBuKSB7XG4gIHJldHVybiAoaSAlIG4gKyBuKSAlIG47XG59XG5cbmZ1bmN0aW9uIGxlcnAobWluLCBtYXgsIHQpIHtcbiAgcmV0dXJuIG1pbiAqICgxIC0gdCkgKyBtYXggKiB0O1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlTGVycChtaW4sIG1heCwgdmFsKSB7XG4gIHJldHVybiAodmFsIC0gbWluKSAvIChtYXggLSBtaW4pO1xufVxuXG5mdW5jdGlvbiBjbGFtcChtaW4sIHZhbCwgbWF4KSB7XG4gIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKHZhbCwgbWF4KSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGVscGVycy9tYXRoX2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.buildGalaxy = buildGalaxy;\n\nvar _math_helpers = __webpack_require__(3);\n\nvar _random_helpers = __webpack_require__(5);\n\nfunction buildGalaxy(_ref) {\n  var rngSeed = _ref.rngSeed,\n      starCount = _ref.starCount,\n      galaxyRadius = _ref.galaxyRadius,\n      spiralArms = _ref.spiralArms,\n      spiralCurve = _ref.spiralCurve,\n      armSpread = _ref.armSpread,\n      armPull = _ref.armPull,\n      coreDensity = _ref.coreDensity;\n\n  var rng = new _random_helpers.RNG(rngSeed);\n  var systems = [];\n  var galaxy = systems;\n\n  for (var i = 0; i < starCount; i++) {\n    var _polarUniformLogarith = polarUniformLogarithmicSpiral(rng, spiralCurve, coreDensity),\n        r = _polarUniformLogarith.r,\n        t = _polarUniformLogarith.t;\n\n    t = 2 * Math.PI * (rng.randomInteger(1, spiralArms + 1) / spiralArms) + t;\n\n    var _polarToCartesian = (0, _math_helpers.polarToCartesian)(r, t),\n        x = _polarToCartesian.x,\n        y = _polarToCartesian.y;\n\n    var varPolar = polarExpCircleDistribution(rng, armPull);\n    var varCartesian = (0, _math_helpers.polarToCartesian)(varPolar.r * armSpread, varPolar.t);\n    x = (x + varCartesian.x) * galaxyRadius;\n    y = (y + varCartesian.y) * galaxyRadius;\n    var backToPolar = (0, _math_helpers.cartesianToPolar)(x, y);\n    systems.push({\n      pos: {\n        x: x,\n        y: y,\n        r: backToPolar.r,\n        t: backToPolar.t\n        // type: rng.randomByWeights(\n        //   intepolatedWeights(\n        //     starTypesWeights.min,\n        //     starTypesWeights.max,\n        //     starTypesWeights.ease,\n        //     0,\n        //     galaxyRoughRadius,\n        //     backToPolar.r\n        //   )\n        // ),\n        // size: rng.randomByWeights(\n        //   intepolatedWeights(\n        //     starSizeWeights.min,\n        //     starSizeWeights.max,\n        //     starSizeWeights.ease,\n        //     0,\n        //     galaxyRoughRadius,\n        //     backToPolar.r\n        //   )\n        // ),\n      } });\n  }\n\n  return galaxy;\n}\n//\n// function intepolatedWeights(minWeights, maxWeights, ease, min, max, value) {\n//   return Object.keys(minWeights).reduce((weights, key) => {\n//     weights[key] = lerp(minWeights[key], maxWeights[key], ease(inverseLerp(min, max, value)));\n//     return weights;\n//   }, {});\n// }\n\nfunction polarExpCircleDistribution(rng, exp) {\n  var u = rng.random() + rng.random();\n  var r = u > 1 ? 2 - u : u;\n  var t = 2 * Math.PI * rng.random();\n  return { r: Math.pow(r, exp), t: t };\n}\n\nfunction polarUniformLogarithmicSpiral(rng, b, spiralCoreDensity) {\n  var maxR = Math.exp(b * Math.PI * 2 * spiralCoreDensity);\n  var t = rng.random() * Math.PI * 2 * spiralCoreDensity;\n  var r = Math.exp(b * t) / maxR;\n  return { r: r, t: t };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9nYWxheHlfYnVpbGRlci5qcz84YjQwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5idWlsZEdhbGF4eSA9IGJ1aWxkR2FsYXh5O1xuXG52YXIgX21hdGhfaGVscGVycyA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvbWF0aF9oZWxwZXJzXCIpO1xuXG52YXIgX3JhbmRvbV9oZWxwZXJzID0gcmVxdWlyZShcIi4vaGVscGVycy9yYW5kb21faGVscGVyc1wiKTtcblxuZnVuY3Rpb24gYnVpbGRHYWxheHkoX3JlZikge1xuICB2YXIgcm5nU2VlZCA9IF9yZWYucm5nU2VlZCxcbiAgICAgIHN0YXJDb3VudCA9IF9yZWYuc3RhckNvdW50LFxuICAgICAgZ2FsYXh5UmFkaXVzID0gX3JlZi5nYWxheHlSYWRpdXMsXG4gICAgICBzcGlyYWxBcm1zID0gX3JlZi5zcGlyYWxBcm1zLFxuICAgICAgc3BpcmFsQ3VydmUgPSBfcmVmLnNwaXJhbEN1cnZlLFxuICAgICAgYXJtU3ByZWFkID0gX3JlZi5hcm1TcHJlYWQsXG4gICAgICBhcm1QdWxsID0gX3JlZi5hcm1QdWxsLFxuICAgICAgY29yZURlbnNpdHkgPSBfcmVmLmNvcmVEZW5zaXR5O1xuXG4gIHZhciBybmcgPSBuZXcgX3JhbmRvbV9oZWxwZXJzLlJORyhybmdTZWVkKTtcbiAgdmFyIHN5c3RlbXMgPSBbXTtcbiAgdmFyIGdhbGF4eSA9IHN5c3RlbXM7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFyQ291bnQ7IGkrKykge1xuICAgIHZhciBfcG9sYXJVbmlmb3JtTG9nYXJpdGggPSBwb2xhclVuaWZvcm1Mb2dhcml0aG1pY1NwaXJhbChybmcsIHNwaXJhbEN1cnZlLCBjb3JlRGVuc2l0eSksXG4gICAgICAgIHIgPSBfcG9sYXJVbmlmb3JtTG9nYXJpdGgucixcbiAgICAgICAgdCA9IF9wb2xhclVuaWZvcm1Mb2dhcml0aC50O1xuXG4gICAgdCA9IDIgKiBNYXRoLlBJICogKHJuZy5yYW5kb21JbnRlZ2VyKDEsIHNwaXJhbEFybXMgKyAxKSAvIHNwaXJhbEFybXMpICsgdDtcblxuICAgIHZhciBfcG9sYXJUb0NhcnRlc2lhbiA9ICgwLCBfbWF0aF9oZWxwZXJzLnBvbGFyVG9DYXJ0ZXNpYW4pKHIsIHQpLFxuICAgICAgICB4ID0gX3BvbGFyVG9DYXJ0ZXNpYW4ueCxcbiAgICAgICAgeSA9IF9wb2xhclRvQ2FydGVzaWFuLnk7XG5cbiAgICB2YXIgdmFyUG9sYXIgPSBwb2xhckV4cENpcmNsZURpc3RyaWJ1dGlvbihybmcsIGFybVB1bGwpO1xuICAgIHZhciB2YXJDYXJ0ZXNpYW4gPSAoMCwgX21hdGhfaGVscGVycy5wb2xhclRvQ2FydGVzaWFuKSh2YXJQb2xhci5yICogYXJtU3ByZWFkLCB2YXJQb2xhci50KTtcbiAgICB4ID0gKHggKyB2YXJDYXJ0ZXNpYW4ueCkgKiBnYWxheHlSYWRpdXM7XG4gICAgeSA9ICh5ICsgdmFyQ2FydGVzaWFuLnkpICogZ2FsYXh5UmFkaXVzO1xuICAgIHZhciBiYWNrVG9Qb2xhciA9ICgwLCBfbWF0aF9oZWxwZXJzLmNhcnRlc2lhblRvUG9sYXIpKHgsIHkpO1xuICAgIHN5c3RlbXMucHVzaCh7XG4gICAgICBwb3M6IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgcjogYmFja1RvUG9sYXIucixcbiAgICAgICAgdDogYmFja1RvUG9sYXIudFxuICAgICAgICAvLyB0eXBlOiBybmcucmFuZG9tQnlXZWlnaHRzKFxuICAgICAgICAvLyAgIGludGVwb2xhdGVkV2VpZ2h0cyhcbiAgICAgICAgLy8gICAgIHN0YXJUeXBlc1dlaWdodHMubWluLFxuICAgICAgICAvLyAgICAgc3RhclR5cGVzV2VpZ2h0cy5tYXgsXG4gICAgICAgIC8vICAgICBzdGFyVHlwZXNXZWlnaHRzLmVhc2UsXG4gICAgICAgIC8vICAgICAwLFxuICAgICAgICAvLyAgICAgZ2FsYXh5Um91Z2hSYWRpdXMsXG4gICAgICAgIC8vICAgICBiYWNrVG9Qb2xhci5yXG4gICAgICAgIC8vICAgKVxuICAgICAgICAvLyApLFxuICAgICAgICAvLyBzaXplOiBybmcucmFuZG9tQnlXZWlnaHRzKFxuICAgICAgICAvLyAgIGludGVwb2xhdGVkV2VpZ2h0cyhcbiAgICAgICAgLy8gICAgIHN0YXJTaXplV2VpZ2h0cy5taW4sXG4gICAgICAgIC8vICAgICBzdGFyU2l6ZVdlaWdodHMubWF4LFxuICAgICAgICAvLyAgICAgc3RhclNpemVXZWlnaHRzLmVhc2UsXG4gICAgICAgIC8vICAgICAwLFxuICAgICAgICAvLyAgICAgZ2FsYXh5Um91Z2hSYWRpdXMsXG4gICAgICAgIC8vICAgICBiYWNrVG9Qb2xhci5yXG4gICAgICAgIC8vICAgKVxuICAgICAgICAvLyApLFxuICAgICAgfSB9KTtcbiAgfVxuXG4gIHJldHVybiBnYWxheHk7XG59XG4vL1xuLy8gZnVuY3Rpb24gaW50ZXBvbGF0ZWRXZWlnaHRzKG1pbldlaWdodHMsIG1heFdlaWdodHMsIGVhc2UsIG1pbiwgbWF4LCB2YWx1ZSkge1xuLy8gICByZXR1cm4gT2JqZWN0LmtleXMobWluV2VpZ2h0cykucmVkdWNlKCh3ZWlnaHRzLCBrZXkpID0+IHtcbi8vICAgICB3ZWlnaHRzW2tleV0gPSBsZXJwKG1pbldlaWdodHNba2V5XSwgbWF4V2VpZ2h0c1trZXldLCBlYXNlKGludmVyc2VMZXJwKG1pbiwgbWF4LCB2YWx1ZSkpKTtcbi8vICAgICByZXR1cm4gd2VpZ2h0cztcbi8vICAgfSwge30pO1xuLy8gfVxuXG5mdW5jdGlvbiBwb2xhckV4cENpcmNsZURpc3RyaWJ1dGlvbihybmcsIGV4cCkge1xuICB2YXIgdSA9IHJuZy5yYW5kb20oKSArIHJuZy5yYW5kb20oKTtcbiAgdmFyIHIgPSB1ID4gMSA/IDIgLSB1IDogdTtcbiAgdmFyIHQgPSAyICogTWF0aC5QSSAqIHJuZy5yYW5kb20oKTtcbiAgcmV0dXJuIHsgcjogTWF0aC5wb3cociwgZXhwKSwgdDogdCB9O1xufVxuXG5mdW5jdGlvbiBwb2xhclVuaWZvcm1Mb2dhcml0aG1pY1NwaXJhbChybmcsIGIsIHNwaXJhbENvcmVEZW5zaXR5KSB7XG4gIHZhciBtYXhSID0gTWF0aC5leHAoYiAqIE1hdGguUEkgKiAyICogc3BpcmFsQ29yZURlbnNpdHkpO1xuICB2YXIgdCA9IHJuZy5yYW5kb20oKSAqIE1hdGguUEkgKiAyICogc3BpcmFsQ29yZURlbnNpdHk7XG4gIHZhciByID0gTWF0aC5leHAoYiAqIHQpIC8gbWF4UjtcbiAgcmV0dXJuIHsgcjogciwgdDogdCB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dhbGF4eV9idWlsZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.seededRandom = seededRandom;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _randomFloat() {\n  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n  var rndFunc = arguments[2];\n\n  rndFunc = rndFunc || Math.random;\n  return rndFunc() * (max - min) + min;\n}\n\nexports.randomFloat = _randomFloat;\nfunction _randomInteger() {\n  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n  var rndFunc = arguments[2];\n\n  rndFunc = rndFunc || Math.random;\n  return Math.floor(_randomFloat(min, max, rndFunc));\n}\n\nexports.randomInteger = _randomInteger;\nfunction _randomBoolean(rndFunc) {\n  return rndFunc() > 0.5;\n}\n\nexports.randomBoolean = _randomBoolean;\nfunction _randomString(rndFunc) {\n  return rndFunc().toString(36).substring(7);\n}\n\nexports.randomString = _randomString;\nfunction _randomSample(array, rndFunc) {\n  return array[_randomInteger(0, array.length, rndFunc)];\n}\n\nexports.randomSample = _randomSample;\nfunction _randomByWeights(weights, rndFunc) {\n  var keys = Object.keys(weights);\n  var sortedKeysByWeights = keys.sort(function (a, b) {\n    return weights[a] - weights[b];\n  });\n  var sortedWeights = sortedKeysByWeights.map(function (val) {\n    return weights[val];\n  });\n  var accumulatedWeights = sortedWeights.reduce(function (accumulated, currentValue, index) {\n    return [].concat(_toConsumableArray(accumulated), [currentValue + (accumulated[index - 1] || 0)]);\n  }, []);\n  var totalWeight = accumulatedWeights[accumulatedWeights.length - 1];\n  var randomInt = _randomInteger(0, totalWeight, rndFunc);\n  var matchingRangeIndex = accumulatedWeights.findIndex(function (accumulatedWeight) {\n    return randomInt < accumulatedWeight;\n  });\n  return sortedKeysByWeights[matchingRangeIndex];\n}\n\nexports.randomByWeights = _randomByWeights;\nfunction seededRandom(seed) {\n  var x = Math.sin(seed) * 10000;\n  return x - Math.floor(x);\n}\n\nvar RNG = exports.RNG = function () {\n  function RNG(seed) {\n    _classCallCheck(this, RNG);\n\n    this.seed = seed;\n    this.counter = 0;\n    this._random = this.random.bind(this);\n  }\n\n  _createClass(RNG, [{\n    key: \"reset\",\n    value: function reset() {\n      this.counter = 0;\n    }\n  }, {\n    key: \"random\",\n    value: function random() {\n      return this.randomWithCounter(this.counter++);\n    }\n  }, {\n    key: \"randomWithCounter\",\n    value: function randomWithCounter(counter) {\n      return seededRandom(this.seed + counter);\n    }\n  }, {\n    key: \"randomFloat\",\n    value: function randomFloat(min, max) {\n      return _randomFloat(min, max, this._random);\n    }\n  }, {\n    key: \"randomInteger\",\n    value: function randomInteger(min, max) {\n      return _randomInteger(min, max, this._random);\n    }\n  }, {\n    key: \"randomBoolean\",\n    value: function randomBoolean() {\n      return _randomBoolean(this._random);\n    }\n  }, {\n    key: \"randomString\",\n    value: function randomString() {\n      return _randomString(this._random);\n    }\n  }, {\n    key: \"randomSample\",\n    value: function randomSample(array) {\n      return _randomSample(array, this._random);\n    }\n  }, {\n    key: \"randomByWeights\",\n    value: function randomByWeights(weights) {\n      return _randomByWeights(weights, this._random);\n    }\n  }]);\n\n  return RNG;\n}();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL3JhbmRvbV9oZWxwZXJzLmpzPzZjMjUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmV4cG9ydHMuc2VlZGVkUmFuZG9tID0gc2VlZGVkUmFuZG9tO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuZnVuY3Rpb24gX3JhbmRvbUZsb2F0KCkge1xuICB2YXIgbWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuICB2YXIgbWF4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAxO1xuICB2YXIgcm5kRnVuYyA9IGFyZ3VtZW50c1syXTtcblxuICBybmRGdW5jID0gcm5kRnVuYyB8fCBNYXRoLnJhbmRvbTtcbiAgcmV0dXJuIHJuZEZ1bmMoKSAqIChtYXggLSBtaW4pICsgbWluO1xufVxuXG5leHBvcnRzLnJhbmRvbUZsb2F0ID0gX3JhbmRvbUZsb2F0O1xuZnVuY3Rpb24gX3JhbmRvbUludGVnZXIoKSB7XG4gIHZhciBtaW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG4gIHZhciBtYXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDE7XG4gIHZhciBybmRGdW5jID0gYXJndW1lbnRzWzJdO1xuXG4gIHJuZEZ1bmMgPSBybmRGdW5jIHx8IE1hdGgucmFuZG9tO1xuICByZXR1cm4gTWF0aC5mbG9vcihfcmFuZG9tRmxvYXQobWluLCBtYXgsIHJuZEZ1bmMpKTtcbn1cblxuZXhwb3J0cy5yYW5kb21JbnRlZ2VyID0gX3JhbmRvbUludGVnZXI7XG5mdW5jdGlvbiBfcmFuZG9tQm9vbGVhbihybmRGdW5jKSB7XG4gIHJldHVybiBybmRGdW5jKCkgPiAwLjU7XG59XG5cbmV4cG9ydHMucmFuZG9tQm9vbGVhbiA9IF9yYW5kb21Cb29sZWFuO1xuZnVuY3Rpb24gX3JhbmRvbVN0cmluZyhybmRGdW5jKSB7XG4gIHJldHVybiBybmRGdW5jKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcbn1cblxuZXhwb3J0cy5yYW5kb21TdHJpbmcgPSBfcmFuZG9tU3RyaW5nO1xuZnVuY3Rpb24gX3JhbmRvbVNhbXBsZShhcnJheSwgcm5kRnVuYykge1xuICByZXR1cm4gYXJyYXlbX3JhbmRvbUludGVnZXIoMCwgYXJyYXkubGVuZ3RoLCBybmRGdW5jKV07XG59XG5cbmV4cG9ydHMucmFuZG9tU2FtcGxlID0gX3JhbmRvbVNhbXBsZTtcbmZ1bmN0aW9uIF9yYW5kb21CeVdlaWdodHMod2VpZ2h0cywgcm5kRnVuYykge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHdlaWdodHMpO1xuICB2YXIgc29ydGVkS2V5c0J5V2VpZ2h0cyA9IGtleXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiB3ZWlnaHRzW2FdIC0gd2VpZ2h0c1tiXTtcbiAgfSk7XG4gIHZhciBzb3J0ZWRXZWlnaHRzID0gc29ydGVkS2V5c0J5V2VpZ2h0cy5tYXAoZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiB3ZWlnaHRzW3ZhbF07XG4gIH0pO1xuICB2YXIgYWNjdW11bGF0ZWRXZWlnaHRzID0gc29ydGVkV2VpZ2h0cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdGVkLCBjdXJyZW50VmFsdWUsIGluZGV4KSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYWNjdW11bGF0ZWQpLCBbY3VycmVudFZhbHVlICsgKGFjY3VtdWxhdGVkW2luZGV4IC0gMV0gfHwgMCldKTtcbiAgfSwgW10pO1xuICB2YXIgdG90YWxXZWlnaHQgPSBhY2N1bXVsYXRlZFdlaWdodHNbYWNjdW11bGF0ZWRXZWlnaHRzLmxlbmd0aCAtIDFdO1xuICB2YXIgcmFuZG9tSW50ID0gX3JhbmRvbUludGVnZXIoMCwgdG90YWxXZWlnaHQsIHJuZEZ1bmMpO1xuICB2YXIgbWF0Y2hpbmdSYW5nZUluZGV4ID0gYWNjdW11bGF0ZWRXZWlnaHRzLmZpbmRJbmRleChmdW5jdGlvbiAoYWNjdW11bGF0ZWRXZWlnaHQpIHtcbiAgICByZXR1cm4gcmFuZG9tSW50IDwgYWNjdW11bGF0ZWRXZWlnaHQ7XG4gIH0pO1xuICByZXR1cm4gc29ydGVkS2V5c0J5V2VpZ2h0c1ttYXRjaGluZ1JhbmdlSW5kZXhdO1xufVxuXG5leHBvcnRzLnJhbmRvbUJ5V2VpZ2h0cyA9IF9yYW5kb21CeVdlaWdodHM7XG5mdW5jdGlvbiBzZWVkZWRSYW5kb20oc2VlZCkge1xuICB2YXIgeCA9IE1hdGguc2luKHNlZWQpICogMTAwMDA7XG4gIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbn1cblxudmFyIFJORyA9IGV4cG9ydHMuUk5HID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSTkcoc2VlZCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSTkcpO1xuXG4gICAgdGhpcy5zZWVkID0gc2VlZDtcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgIHRoaXMuX3JhbmRvbSA9IHRoaXMucmFuZG9tLmJpbmQodGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUk5HLCBbe1xuICAgIGtleTogXCJyZXNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJhbmRvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByYW5kb20oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYW5kb21XaXRoQ291bnRlcih0aGlzLmNvdW50ZXIrKyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJhbmRvbVdpdGhDb3VudGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJhbmRvbVdpdGhDb3VudGVyKGNvdW50ZXIpIHtcbiAgICAgIHJldHVybiBzZWVkZWRSYW5kb20odGhpcy5zZWVkICsgY291bnRlcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJhbmRvbUZsb2F0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJhbmRvbUZsb2F0KG1pbiwgbWF4KSB7XG4gICAgICByZXR1cm4gX3JhbmRvbUZsb2F0KG1pbiwgbWF4LCB0aGlzLl9yYW5kb20pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyYW5kb21JbnRlZ2VyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgICAgIHJldHVybiBfcmFuZG9tSW50ZWdlcihtaW4sIG1heCwgdGhpcy5fcmFuZG9tKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmFuZG9tQm9vbGVhblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByYW5kb21Cb29sZWFuKCkge1xuICAgICAgcmV0dXJuIF9yYW5kb21Cb29sZWFuKHRoaXMuX3JhbmRvbSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJhbmRvbVN0cmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByYW5kb21TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gX3JhbmRvbVN0cmluZyh0aGlzLl9yYW5kb20pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyYW5kb21TYW1wbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmFuZG9tU2FtcGxlKGFycmF5KSB7XG4gICAgICByZXR1cm4gX3JhbmRvbVNhbXBsZShhcnJheSwgdGhpcy5fcmFuZG9tKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmFuZG9tQnlXZWlnaHRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJhbmRvbUJ5V2VpZ2h0cyh3ZWlnaHRzKSB7XG4gICAgICByZXR1cm4gX3JhbmRvbUJ5V2VpZ2h0cyh3ZWlnaHRzLCB0aGlzLl9yYW5kb20pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSTkc7XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGVscGVycy9yYW5kb21faGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///5\n");

/***/ })
/******/ ]);