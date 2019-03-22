(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"./src/controllers/PlacesController.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return g});var a=n("./node_modules/react/index.js"),o=n.n(a),r=n("./node_modules/@mdx-js/tag/dist/index.js");function p(e){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function m(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function c(e,t){return!t||"object"!==p(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=c(this,s(t).call(this,e))).layout=null,n}var n,a,p;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(t,o.a.Component),n=t,(a=[{key:"render",value:function(){var e=this.props,t=e.components;l(e,["components"]);return o.a.createElement(r.MDXTag,{name:"wrapper",components:t},o.a.createElement(r.MDXTag,{name:"h1",components:t,props:{id:"placescontroller"}},"PlacesController"),o.a.createElement(r.MDXTag,{name:"p",components:t},"A ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"PlacesController")," uses the Google Maps API to get place ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"predictions")," and ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"details"),"."),o.a.createElement(r.MDXTag,{name:"table",components:t},o.a.createElement(r.MDXTag,{name:"thead",components:t,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"thead"},o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Option"),o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Type"),o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"DefaultValue"),o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),o.a.createElement(r.MDXTag,{name:"tbody",components:t,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"apiKey"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"string"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}}),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Your ",o.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"td",props:{href:"https://developers.google.com/maps/documentation/javascript/get-api-key"}},"Google Places API Key"),".")))),o.a.createElement(r.MDXTag,{name:"table",components:t},o.a.createElement(r.MDXTag,{name:"thead",components:t,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"thead"},o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Property"),o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Type"),o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),o.a.createElement(r.MDXTag,{name:"tbody",components:t,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"predictions"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"object[]"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The results of a ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"getPlacePredictions")," call.")),o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"details"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"object"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The results of a ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"getPlaceDetails")," call.")),o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"hasPredictions"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"boolean"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Whether the controller has predictions.")),o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"autocompleteService"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"object"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The controller's Google AutoCompleteService instance.")),o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"geocoder"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"object"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"The controller's Google Geocoder instance.")))),o.a.createElement(r.MDXTag,{name:"table",components:t},o.a.createElement(r.MDXTag,{name:"thead",components:t,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"thead"},o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Method"),o.a.createElement(r.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:"left"}},"Description"))),o.a.createElement(r.MDXTag,{name:"tbody",components:t,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"getPlacePredictions(string)"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Fetch place predictions using a string, such as an address or city name.")),o.a.createElement(r.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"getPlaceDetails(placeId, options)"),o.a.createElement(r.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:"left"}},"Fetch place details using a (such as a prediction's ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"place_id"),"), with ",o.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"td",props:{href:"https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest"}},"additional options"),".")))),o.a.createElement(r.MDXTag,{name:"p",components:t},"Example:"),o.a.createElement(r.MDXTag,{name:"pre",components:t},o.a.createElement(r.MDXTag,{name:"code",components:t,parentName:"pre",props:{className:"language-tsx"}},'import * as React from "react"\nimport { Override, Frame } from "framer"\nimport { PlacesController } from "framer-controller"\nimport { Prediction } from "./canvas"\n\nconst controller = new PlacesController({\n    apiKey: "YOUR_GOOGLE_PLACES_API_KEY",\n})\n\nexport const PlacesInput: Override = () => ({\n    onValueChange: v => {\n        if (v.length > 2) {\n            controller.getPlacePredictions(v)\n        } else {\n            controller.clearPredictions()\n        }\n    },\n})\n\nexport const PredictionContainer: Override = () => ({\n    children: controller.predictions.map((p, i) => (\n        <Frame\n            top={i * 64}\n            left={0}\n            width={"100%"}\n            background={null}\n            height={64}\n            onClick={() => controller.getPlaceDetails(p.place_id)}\n        >\n            <Prediction $value={p.description} width={"100%"} />\n        </Frame>\n    )),\n})\n\nexport const ViewDetailsLink: Override = props => ({\n    top: controller.predictions.length === 0 ? 2000 : props.top,\n})\n\nexport const ViewDetailsButton: Override = () => ({\n    disabled: controller.predictions.length === 0,\n})\n\nexport const DetailsLabel: Override = () => {\n    const { details } = controller\n    return {\n        visible: details,\n        $value:\n            details &&\n            `${details.geometry.location\n                .lng()\n                .toFixed(2)}, ${details.geometry.location.lat().toFixed(2)}`,\n    }\n}\n')))}}])&&m(n.prototype,a),p&&m(n,p),t}();g.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}}}]);
//# sourceMappingURL=src-controllers-places-controller.18a240eaa4ff9a78ee2f.js.map