(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		try { modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); } catch (error) { module.exports = { error } }
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	// asset url
/******/ 	var __module_i = eval("typeof module !== 'undefined' ? module.i : ''");
/******/ 	var __framer_package = (/(node_modules[/].*)[/](build|dist).index.js/.exec(__module_i) || [])[1]
/******/ 	function __asset_url__(src) { return __WEBPACK_EXTERNAL_MODULE_framer__.serverURL(__framer_package, src) };
/******/ 	installedModules['framer/resource'] = { i: 'framer/resource', l: true, exports: { url: __asset_url__ } };
/******/
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./package.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader/index.js!./code/index.css":
/*!***********************************************************************************************************!*\
  !*** /Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader!./code/index.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader/lib/css-base.js */ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);", ""]);

// module
exports.push([module.i, "/* Webfont imports  */\n\n/* edu */\n\n.edu-style {\n\tcolor: #000;\n\tbackground-color: #efefef;\n\tborder-radius: 12px;\n\tdisplay: flex;\n\talign-content: center;\n\tjustify-content: space-around;\n\ttext-align: center;\n\tpadding: 16px;\n}\n\n.dark-style {\n\tcolor: #fff;\n\tbackground-color: #1d1d1d;\n\tborder-radius: 12px;\n\tdisplay: flex;\n\talign-content: center;\n\tjustify-content: space-around;\n\ttext-align: center;\n\tpadding: 16px;\n}\n\n/* ========================================================================== */\n/*                                 TEXT INPUT                                 */\n/* ========================================================================== */\n\n.edu-input {\n\tcursor: inherit;\n\twidth: 100%;\n\theight: 100%;\n\tfont-size: 14px;\n\tfont-family: \"Source Sans Pro\";\n\tfont-weight: 500;\n\ttext-align: left;\n\tcolor: #ffffff;\n\tbackground-color: #2369e1;\n\tborder: 1px solid #2369e1;\n\tborder-radius: 8px;\n\tpadding: 12px 16px;\n\toutline: none;\n\ttransition: all 0.2s;\n}\n\n.edu-input:hover {\n\tborder: 1px solid #2e77f3;\n}\n\n.edu-input:active {\n\tborder: 1px solid #114aac;\n}\n\n.edu-input:focus {\n\tborder: 1px solid #114aac;\n}\n\n/* -------------------------- Text Input (disabled) ------------------------- */\n\n.edu-input.disabled {\n\tpointer-events: none;\n\topacity: 0.5;\n}\n\n/* ------------------------ Text Input (placeholder) ------------------------ */\n\n.edu-input::placeholder {\n\tcolor: #ccc;\n}\n\n/* ========================================================================== */\n/*                                   BUTTON                                   */\n/* ========================================================================== */\n\n.edu-button {\n\tcursor: inherit;\n\twidth: 100%;\n\tfont-size: 14px;\n\tfont-family: \"Source Sans Pro\";\n\tfont-weight: 600;\n\ttext-align: center;\n\tcolor: #ffffff;\n\tbackground-color: #2369e1;\n\tborder: 1px solid #2369e1;\n\tborder-radius: 8px;\n\tpadding: 12px 16px;\n\toutline: none;\n\ttransition: all 0.2s;\n}\n\n.edu-button:hover {\n\tborder: 1px solid #2e77f3;\n}\n\n.edu-button:active {\n\tborder: 1px solid #114aac;\n}\n\n.edu-button:focus {\n\tborder: 1px solid #114aac;\n}\n\n/* ---------------------------- Button (disabled) --------------------------- */\n\n.edu-button.disabled {\n\topacity: 0.5;\n\tpointer-events: none;\n}\n\n/* ---------------------------- Button (Toggled) ---------------------------- */\n\n.edu-button.toggled {\n\tbackground-color: #d1d1d1;\n\tborder: 1px solid #a5a5a5;\n}\n\n.edu-button.toggled:hover {\n\tbackground-color: #c4c4c4;\n\tborder: 1px solid #949494;\n}\n\n.edu-button.toggled:active {\n\tbackground-color: #b1b1b1;\n\tborder: 1px solid #868686;\n}\n\n.edu-button.toggled:focus {\n\tborder: 1px solid #868686;\n}\n\n/* --------------------------------- Select --------------------------------- */\n\n.edu-select {\n\tpointer-events: none;\n\tcursor: inherit;\n\twidth: 100%;\n\theight: 100%;\n\tfont-size: 14px;\n\tfont-family: \"Source Sans Pro\";\n\tfont-weight: 600;\n\ttext-align: left;\n\tcolor: #ffffff;\n\tbackground-color: #2369e1;\n\tborder: 1px solid #2369e1;\n\tborder-radius: 8px;\n\tpadding: 12px 16px;\n\toutline: none;\n\ttransition: all 0.2s;\n}\n\n.edu-select::after {\n\tcursor: inherit;\n\tdisplay: flex;\n\theight: 100%;\n\talign-items: center;\n\tposition: absolute;\n\ttop: 0;\n\tright: 16px;\n\tfont-size: 18px;\n\tcontent: \"\\25BE\";\n\topacity: 0.7;\n\tcolor: inherit;\n}\n\n.edu-select.disabled {\n\topacity: 0.5;\n\tpointer-events: none;\n}\n\n.edu-select:hover {\n\tborder: 1px solid #2e77f3;\n}\n\n.edu-select:active {\n\tborder: 1px solid #114aac;\n\tfilter: brightness(90%);\n}\n\n.edu-select:focus {\n\tborder: 1px solid #114aac;\n}\n\n/* ========================================================================== */\n/*                                   TOGGLE                                   */\n/* ========================================================================== */\n\n.edu-toggle {\n\tcursor: inherit;\n\tposition: relative;\n\tbackground: none;\n\tborder: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.edu-toggle.disabled {\n\topacity: 0.5;\n\tpointer-events: none;\n}\n\n.edu-toggle.rail {\n\tpointer-events: none;\n\tposition: absolute;\n\ttop: calc(50% - 8px);\n\tleft: 12px;\n\tright: 12px;\n\twidth: auto;\n\theight: 16px;\n\tbackground: #f7f7f7;\n\tborder: 1px solid #dfdfdf;\n\tborder-radius: 8px;\n\ttransition: all 0.2s;\n}\n\n.edu-toggle.rail.toggled {\n\tbackground: #c7c7c7;\n\tborder: 1px solid #c7c7c7;\n}\n\n.edu-toggle:hover .rail {\n\tborder: 1px solid #929292;\n}\n\n.edu-toggle.knob {\n\tpointer-events: none;\n\tposition: absolute;\n\ttop: calc(50% - 16px);\n\tleft: 8px;\n\theight: 32px;\n\twidth: 32px;\n\tbackground: #efefef;\n\tborder: 1px solid #dfdfdf;\n\tborder-radius: 16px;\n\ttransition: all 0.2s;\n}\n\n.edu-toggle.knob.toggled {\n\tleft: calc(100% - 40px);\n}\n\n.edu-toggle:hover .knob {\n\tborder: 1px solid #b1b1b1;\n}\n\n/* ========================================================================== */\n/*                                RANGE SLIDER                                */\n/* ========================================================================== */\n\ninput[type=\"range\"] {\n\t/* -webkit-appearance: none; */\n}\n\n/* .edu-slider {\n\t-webkit-appearance: none;\n\tpointer-events: none;\n\tposition: absolute;\n\ttop: calc(50% - 8px);\n\tleft: 12px;\n\tright: 12px;\n\twidth: auto;\n\theight: 8px;\n\tbackground: #f7f7f7;\n\tborder: 1px solid #dfdfdf;\n\tborder-radius: 8px;\n\ttransition: all 0.2s;\n}\n\n.edu-slider:-webkit-slider-thumb {\n\tpointer-events: none;\n\tposition: absolute;\n\ttop: calc(50% - 16px);\n\tleft: 8px;\n\theight: 32px;\n\twidth: 32px;\n\tbackground: #efefef;\n\tborder: 1px solid #464040;\n\tborder-radius: 16px;\n\ttransition: all 0.2s;\n}\n\n.edu-slider:hover {\n\tborder: 1px solid #b1b1b1;\n} */\n/* // Range Slider\n$range-width: 100% !default;\n\n$range-handle-color: $shade-10 !default;\n$range-handle-color-hover: $teal !default;\n$range-handle-size: 20px !default;\n\n$range-track-color: $shade-1 !default;\n$range-track-height: 10px !default;\n\n$range-label-color: $shade-10 !default;\n$range-label-width: 60px !default;\n\n.range-slider {\n  width: $range-width;\n}\n\n.range-slider__range {\n  -webkit-appearance: none;\n  width: calc(100% - (#{$range-label-width + 13px}));\n  height: $range-track-height;\n  border-radius: 5px;\n  background: $range-track-color;\n  outline: none;\n  padding: 0;\n  margin: 0;\n\n  // Range Handle\n  &::-webkit-slider-thumb {\n    appearance: none;\n    width: $range-handle-size;\n    height: $range-handle-size;\n    border-radius: 50%;\n    background: $range-handle-color;\n    cursor: pointer;\n    transition: background .15s ease-in-out;\n\n    &:hover {\n      background: $range-handle-color-hover;\n    }\n  }\n\n  &:active::-webkit-slider-thumb {\n    background: $range-handle-color-hover;\n  }\n\n  &::-moz-range-thumb {\n    width: $range-handle-size;\n    height: $range-handle-size;\n    border: 0;\n    border-radius: 50%;\n    background: $range-handle-color;\n    cursor: pointer;\n    transition: background .15s ease-in-out;\n\n    &:hover {\n      background: $range-handle-color-hover;\n    }\n  }\n\n  &:active::-moz-range-thumb {\n    background: $range-handle-color-hover;\n  }\n  \n  // Focus state\n  &:focus {\n    \n    &::-webkit-slider-thumb {\n      box-shadow: 0 0 0 3px $shade-0,\n                  0 0 0 6px $teal;\n    }\n  }\n}\n\n\n// Range Label\n.range-slider__value {\n  display: inline-block;\n  position: relative;\n  width: $range-label-width;\n  color: $shade-0;\n  line-height: 20px;\n  text-align: center;\n  border-radius: 3px;\n  background: $range-label-color;\n  padding: 5px 10px;\n  margin-left: 8px;\n\n  &:after {\n    position: absolute;\n    top: 8px;\n    left: -7px;\n    width: 0;\n    height: 0;\n    border-top: 7px solid transparent;\n    border-right: 7px solid $range-label-color;\n    border-bottom: 7px solid transparent;\n    content: '';\n  }\n}\n\n\n// Firefox Overrides\n::-moz-range-track {\n    background: $range-track-color;\n    border: 0;\n}\n\ninput::-moz-focus-inner,\ninput::-moz-focus-outer { \n  border: 0; \n} */\n", ""]);

// exports


/***/ }),

/***/ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader/lib/css-base.js":
/*!**********************************************************************************************************!*\
  !*** /Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader/lib/css-base.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/addStyles.js":
/*!*************************************************************************************************************!*\
  !*** /Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/addStyles.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/urls.js":
/*!********************************************************************************************************!*\
  !*** /Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/urls.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./code sync recursive \\.(t|j)s(x?)|\\.css$":
/*!***************************************!*\
  !*** ./code sync \.(t|j)s(x?)|\.css$ ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./index.css": "./code/index.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./code sync recursive \\.(t|j)s(x?)|\\.css$";

/***/ }),

/***/ "./code/index.css":
/*!************************!*\
  !*** ./code/index.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader!./index.css */ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/css-loader/index.js!./code/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/addStyles.js */ "../../../../../../Applications/Framer X Omega.app/Contents/Resources/Server/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./package.js":
/*!********************!*\
  !*** ./package.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// The template for the dynamic webpack entry. Be aware of the variables

const packageJson = __webpack_require__(/*! ./package.json */ "./package.json")

const package = {
    packageJson,
    sourceModules: {},
    dependencies: {},
}

// This is a special webpack thing that watches the whole directory
// https://github.com/webpack/docs/wiki/context
const ctx = __webpack_require__("./code sync recursive \\.(t|j)s(x?)|\\.css$")

ctx.keys().forEach(key => {
    package.sourceModules[key] = () => ctx(key)
})

// The packages are passed in through a template
const packages = {}

package.dependencies = packages

exports.__framer__ = package


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: framer, default */
/***/ (function(module) {

module.exports = {"framer":{"id":"f74da7bf-1af2-42a9-beb5-47a9b01560ad"}};

/***/ })

/******/ });
});