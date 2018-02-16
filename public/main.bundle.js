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
eval("\n\nvar config = {\n  rngSeed: 1000,\n  starCount: 5000,\n  spiralArms: 3,\n  spiralCurve: 0.3,\n  coreDensity: 1.3,\n  armSpread: 0.9,\n  armPull: 3.75,\n  spaceColor: \"#000000\"\n};\n\nfunction updateInputs() {\n  Object.keys(config).forEach(function (key) {\n    document.getElementById(key).value = config[key];\n  });\n}\n\nfunction render() {\n  console.log(\"render\");\n}\n\nfunction subscribeToInputChanges() {\n  Array.from(document.getElementsByTagName(\"input\")).forEach(function (element) {\n    element.addEventListener(\"change\", function (ev) {\n      config[ev.target.id] = ev.target.value;\n      render();\n    });\n  });\n}\n\nupdateInputs();\nsubscribeToInputChanges();\n//\n//   starTypesWeights: {\n//     ease: easeOutCubic,\n//     min: {\n//       blue: 100,\n//       blueWhite: 200,\n//       white: 1000,\n//       yellowWhite: 500,\n//       yellow: 1000,\n//       lightOrange: 2000,\n//       orangeRed: 2000,\n//       red: 3\n//     },\n//     max: {\n//       blue: 500,\n//       blueWhite: 3000,\n//       white: 2000,\n//       yellowWhite: 120,\n//       yellow: 10,\n//       lightOrange: 10,\n//       orangeRed: 10,\n//       red: 2\n//     }\n//   },\n//   starSizeWeights: {\n//     ease: linear,\n//     min: {\n//       hypergiant: 10,\n//       supergiant: 5,\n//       giant: 10,\n//       standard: 100,\n//       dwarf: 10\n//     },\n//     max: {\n//       hypergiant: 10,\n//       supergiant: 20,\n//       giant: 5,\n//       standard: 50,\n//       dwarf: 100\n//     }\n//   }\n// };//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz84NzQ5Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29uZmlnID0ge1xuICBybmdTZWVkOiAxMDAwLFxuICBzdGFyQ291bnQ6IDUwMDAsXG4gIHNwaXJhbEFybXM6IDMsXG4gIHNwaXJhbEN1cnZlOiAwLjMsXG4gIGNvcmVEZW5zaXR5OiAxLjMsXG4gIGFybVNwcmVhZDogMC45LFxuICBhcm1QdWxsOiAzLjc1LFxuICBzcGFjZUNvbG9yOiBcIiMwMDAwMDBcIlxufTtcblxuZnVuY3Rpb24gdXBkYXRlSW5wdXRzKCkge1xuICBPYmplY3Qua2V5cyhjb25maWcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGtleSkudmFsdWUgPSBjb25maWdba2V5XTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgY29uc29sZS5sb2coXCJyZW5kZXJcIik7XG59XG5cbmZ1bmN0aW9uIHN1YnNjcmliZVRvSW5wdXRDaGFuZ2VzKCkge1xuICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIikpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICBjb25maWdbZXYudGFyZ2V0LmlkXSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICB9KTtcbn1cblxudXBkYXRlSW5wdXRzKCk7XG5zdWJzY3JpYmVUb0lucHV0Q2hhbmdlcygpO1xuLy9cbi8vICAgc3RhclR5cGVzV2VpZ2h0czoge1xuLy8gICAgIGVhc2U6IGVhc2VPdXRDdWJpYyxcbi8vICAgICBtaW46IHtcbi8vICAgICAgIGJsdWU6IDEwMCxcbi8vICAgICAgIGJsdWVXaGl0ZTogMjAwLFxuLy8gICAgICAgd2hpdGU6IDEwMDAsXG4vLyAgICAgICB5ZWxsb3dXaGl0ZTogNTAwLFxuLy8gICAgICAgeWVsbG93OiAxMDAwLFxuLy8gICAgICAgbGlnaHRPcmFuZ2U6IDIwMDAsXG4vLyAgICAgICBvcmFuZ2VSZWQ6IDIwMDAsXG4vLyAgICAgICByZWQ6IDNcbi8vICAgICB9LFxuLy8gICAgIG1heDoge1xuLy8gICAgICAgYmx1ZTogNTAwLFxuLy8gICAgICAgYmx1ZVdoaXRlOiAzMDAwLFxuLy8gICAgICAgd2hpdGU6IDIwMDAsXG4vLyAgICAgICB5ZWxsb3dXaGl0ZTogMTIwLFxuLy8gICAgICAgeWVsbG93OiAxMCxcbi8vICAgICAgIGxpZ2h0T3JhbmdlOiAxMCxcbi8vICAgICAgIG9yYW5nZVJlZDogMTAsXG4vLyAgICAgICByZWQ6IDJcbi8vICAgICB9XG4vLyAgIH0sXG4vLyAgIHN0YXJTaXplV2VpZ2h0czoge1xuLy8gICAgIGVhc2U6IGxpbmVhcixcbi8vICAgICBtaW46IHtcbi8vICAgICAgIGh5cGVyZ2lhbnQ6IDEwLFxuLy8gICAgICAgc3VwZXJnaWFudDogNSxcbi8vICAgICAgIGdpYW50OiAxMCxcbi8vICAgICAgIHN0YW5kYXJkOiAxMDAsXG4vLyAgICAgICBkd2FyZjogMTBcbi8vICAgICB9LFxuLy8gICAgIG1heDoge1xuLy8gICAgICAgaHlwZXJnaWFudDogMTAsXG4vLyAgICAgICBzdXBlcmdpYW50OiAyMCxcbi8vICAgICAgIGdpYW50OiA1LFxuLy8gICAgICAgc3RhbmRhcmQ6IDUwLFxuLy8gICAgICAgZHdhcmY6IDEwMFxuLy8gICAgIH1cbi8vICAgfVxuLy8gfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);