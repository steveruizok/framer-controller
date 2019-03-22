(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"./src/controllers/ScrollController.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return g});var a=n("./node_modules/react/index.js"),r=n.n(a),o=n("./node_modules/@mdx-js/tag/dist/index.js");function m(e){return(m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function c(e,t){return!t||"object"!==m(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=c(this,s(t).call(this,e))).layout=null,n}var n,a,m;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(t,r.a.Component),n=t,(a=[{key:"render",value:function(){var e=this.props,t=e.components;p(e,["components"]);return r.a.createElement(o.MDXTag,{name:"wrapper",components:t},r.a.createElement(o.MDXTag,{name:"h1",components:t,props:{id:"scrollcontroller"}},"ScrollController"),r.a.createElement(o.MDXTag,{name:"p",components:t},"A ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"ScrollController")," is specially written to control Framer's Scroll component."),r.a.createElement(o.MDXTag,{name:"table",components:t},r.a.createElement(o.MDXTag,{name:"thead",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"thead"},r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Option"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Type"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"DefaultValue"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),r.a.createElement(o.MDXTag,{name:"tbody",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"throttle"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"number"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"150"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},r.a.createElement(o.MDXTag,{name:"em",components:t,parentName:"td"},"Optional")," - How often to update the controller's state.")))),r.a.createElement(o.MDXTag,{name:"table",components:t},r.a.createElement(o.MDXTag,{name:"thead",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"thead"},r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Property"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Type"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),r.a.createElement(o.MDXTag,{name:"tbody",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"scrollX"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"number"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The controller's current scroll position on the x axis.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"scrollY"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"number"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The controller's current scroll position on the y axis.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"scrollPoint"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"{x: number, y: number}"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"A normalized value, 0 when the current page is the pager's first page and 1 when the current page is the pager's last page.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"direction"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"{x: string, y: string}"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"A point with either ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"left"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"right"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"none"')," for ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"x"),", and ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"up"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"down"'),", or ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"none"')," for ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"y"),".")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"progress"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"{x: number, y: number}"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Normalized values for each scroll axis. For ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"progress.x"),", a value of 0 is full left and 1 is full right; for ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"progress.y"),", a value of 0 is full top and 1 is full bottom.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"markers"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Marker[]"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"A stateful object containing data about each tracked marker Frame.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"content"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"React.Element"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The connected Scroll component's content frame.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"contentOffset"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"object"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"contentOffsetX")," and ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"contentOffsetY")," values, for controlling a Scroll component's scroll position.")))),r.a.createElement(o.MDXTag,{name:"table",components:t},r.a.createElement(o.MDXTag,{name:"thead",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"thead"},r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Method"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),r.a.createElement(o.MDXTag,{name:"tbody",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"handleScroll(point: {x: number, y: number})"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Update the scroll controller using a point. Often, this is connected to a Scroll component's ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"onMove")," callback.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"scrollToPoint(point: {x: number, y: number}, options)"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Change the page ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"left")," or ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"right"),".")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"scrollToMarker(id: string, edges: string or string[], offset: number, options)"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Scroll to a given marker, edge, with an offset and animation options.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"getMarker(props)"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Get the current marker entry from a given set of Override props.")))),r.a.createElement(o.MDXTag,{name:"h2",components:t,props:{id:"markers"}},"Markers"),r.a.createElement(o.MDXTag,{name:"p",components:t},"The ScrollController will keep track of certain Frames, referred to here as \"markers\". Markers are recognized automatically. A marker must be a child of the controller's connected scroll component's content, and may be a ",r.a.createElement(o.MDXTag,{name:"em",components:t,parentName:"p"},"design component"),' with an override prop named "markerId" (most often, this will be a hidden or ',r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"opacity")," zero text layer, ticked to be overridable) or may be a ",r.a.createElement(o.MDXTag,{name:"em",components:t,parentName:"p"},"code component")," with a ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"markerId")," prop."),r.a.createElement(o.MDXTag,{name:"p",components:t},"For each markers, an entry is made in the ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"controller.markers"),". In the case of ",r.a.createElement(o.MDXTag,{name:"em",components:t,parentName:"p"},"design component")," markers, the marker's property name will be the ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"props.id")," of the design component instance, automatically generated by Framer X. If a marker is ",r.a.createElement(o.MDXTag,{name:"em",components:t,parentName:"p"},"code component"),", its property name will be the value of its ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"props.markerId"),". For example, a design component's entry may be found at ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"controller.markers.id_kukhbjalsdc"),", whereas a code component's entry may be found at ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"controller.markers.myMarker"),"."),r.a.createElement(o.MDXTag,{name:"p",components:t},"Each marker's entry has the following stateful properties."),r.a.createElement(o.MDXTag,{name:"table",components:t},r.a.createElement(o.MDXTag,{name:"thead",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"thead"},r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Property"),r.a.createElement(o.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),r.a.createElement(o.MDXTag,{name:"tbody",components:t,parentName:"table"},r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"absolute"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The marker's absolute position within the content Frame.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"offset"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The marker's position relative to the Scroll component's frame.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"progress"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The marker's progress through the Scroll component's frame. A marker's progress will be ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"{x: 0, y: 0}")," when it is below and to the right of the frame and ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"{x: 1, y: 1}")," when it is above and to the left of the frame.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"intersect"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"A point with normalized ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"x")," and ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"y")," properties describing how much of the marker is currently in view.")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"clip"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"A point describing which edges of the marker are clipped, or out of the Scroll component's current window. For ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"x"),", a marker's clip state may be ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"none"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"both"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"both-left"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"both-right"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"left"'),", or ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"right"'),". For ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"y"),", a marker's clip state may be ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"none"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"both"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"both-top"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"both-bottom"'),", ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"top"'),", or ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"td"},'"bottom"'),".")),r.a.createElement(o.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"visible"),r.a.createElement(o.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Whether the marker is at all visible in the Scroll component's current window.")))),r.a.createElement(o.MDXTag,{name:"p",components:t},"Example:"),r.a.createElement(o.MDXTag,{name:"pre",components:t},r.a.createElement(o.MDXTag,{name:"code",components:t,parentName:"pre",props:{className:"language-tsx"}},'import { Override } from "framer"\nimport { ScrollController } from "framer-controller"\n\nconst controller = new ScrollController()\n\nexport const Scroll: Override = props => {\n    controller.connect(props)\n    return {\n        ...controller.contentOffset,\n        ...controller.state,\n    }\n}\n\nexport const ScrollToButton: Override = () => ({\n    onClick() {\n        controller.scrollToPosition({ x: 150, y: 500 })\n    },\n})\n\nexport const ScrollToMarkerButton: Override = props => ({\n    onClick() {\n        controller.scrollToMarker("id_GgNM8lDZQ", ["top", "left"], 32)\n    },\n})\n\n// May be applied to many different markers, and will produce a unique marker for each.\nexport const ScrollMarker: Override = props => {\n    const marker = controller.getMarker(props)\n    if (!marker) return\n    return {\n        opacity: marker.intersect.y,\n        left: 100 - marker.intersect.x * 100,\n    }\n}\n')))}}])&&l(n.prototype,a),m&&l(n,m),t}();g.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}}}]);
//# sourceMappingURL=src-controllers-scroll-controller.18a240eaa4ff9a78ee2f.js.map