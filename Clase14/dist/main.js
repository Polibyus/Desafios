/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./a1.js":
/*!***************!*\
  !*** ./a1.js ***!
  \***************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const sumar = __webpack_require__(/*! ./a2 */ \"./a2.js\");\r\nconst restar = __webpack_require__(/*! ./a3 */ \"./a3.js\");\r\n\r\nsumar.sumar(2, 4);\r\nrestar.restar(98, 87);\n\n//# sourceURL=webpack://clase14/./a1.js?");

/***/ }),

/***/ "./a2.js":
/*!***************!*\
  !*** ./a2.js ***!
  \***************/
/***/ ((module) => {

eval("function sumar(x, y) {\r\n    return x + y;\r\n}\r\n\r\nmodule.exports = {sumar};\n\n//# sourceURL=webpack://clase14/./a2.js?");

/***/ }),

/***/ "./a3.js":
/*!***************!*\
  !*** ./a3.js ***!
  \***************/
/***/ ((module) => {

eval("function restar(x, y) {\r\n    return x - y;\r\n}\r\n\r\nmodule.exports = {restar};\n\n//# sourceURL=webpack://clase14/./a3.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./a1.js");
/******/ 	__webpack_require__("./a2.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./a3.js");
/******/ 	
/******/ })()
;