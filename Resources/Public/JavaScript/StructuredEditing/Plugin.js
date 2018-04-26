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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = readFromConsumerApi;
function readFromConsumerApi(key) {
    return function () {
        if (window['@Neos:HostPluginAPI'] && window['@Neos:HostPluginAPI']['@' + key]) {
            var _window$NeosHostPlu;

            return (_window$NeosHostPlu = window['@Neos:HostPluginAPI'])['@' + key].apply(_window$NeosHostPlu, arguments);
        }

        throw new Error('You are trying to read from a consumer api that hasn\'t been initialized yet!');
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp2;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _neosUiExtensibility = __webpack_require__(6);

var _neosUiExtensibility2 = _interopRequireDefault(_neosUiExtensibility);

var _neosUiReduxStore = __webpack_require__(10);

var _reactUiComponents = __webpack_require__(11);

var _neosUiDecorators = __webpack_require__(12);

var _reactRedux = __webpack_require__(13);

var _plowJs = __webpack_require__(14);

var _neosUiEditors = __webpack_require__(15);

var _neosUiEditors2 = _interopRequireDefault(_neosUiEditors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineEditorEnvelope = (_dec = (0, _reactRedux.connect)((0, _plowJs.$transform)({
    currentlyEditedPropertyName: _neosUiReduxStore.selectors.UI.ContentCanvas.currentlyEditedPropertyName,
    getNodeByContextPath: _neosUiReduxStore.selectors.CR.Nodes.nodeByContextPath,
    focusedNodePath: _neosUiReduxStore.selectors.CR.Nodes.focusedNodePathSelector
})), (0, _neosUiDecorators.withDragDropContext)(_class = _dec(_class = (_temp2 = _class2 = function (_PureComponent) {
    _inherits(InlineEditorEnvelope, _PureComponent);

    function InlineEditorEnvelope() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InlineEditorEnvelope);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InlineEditorEnvelope.__proto__ || Object.getPrototypeOf(InlineEditorEnvelope)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isOpen: false
        }, _this.handleToggle = function () {
            _this.setState({ isOpen: !_this.state.isOpen });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InlineEditorEnvelope, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props,
                configuration = _props.configuration,
                globalRegistry = _props.globalRegistry,
                routes = _props.routes,
                store = _props.store;

            return { configuration: configuration, globalRegistry: globalRegistry, routes: routes, store: store };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                contextPath = _props2.contextPath,
                fusionPath = _props2.fusionPath,
                propertyName = _props2.propertyName,
                persistChange = _props2.persistChange,
                editorOptions = _props2.editorOptions,
                getNodeByContextPath = _props2.getNodeByContextPath,
                focusedNodePath = _props2.focusedNodePath;

            var node = getNodeByContextPath(contextPath);
            var nodeTypeName = (0, _plowJs.$get)('nodeType', node);
            var nodeType = this.props.nodeTypesRegistry.getNodeType(nodeTypeName);
            var icon = (0, _plowJs.$get)('icon', editorOptions) || 'pencil';
            var value = (0, _plowJs.$get)(['properties', propertyName], node);
            return _react2.default.createElement(
                'div',
                { style: { display: 'inline-block' } },
                _react2.default.createElement(
                    _reactUiComponents.DropDown.Stateless,
                    { isOpen: this.state.isOpen, padded: true, onToggle: this.handleToggle, onClose: function onClose() {
                            return null;
                        } },
                    _react2.default.createElement(
                        _reactUiComponents.DropDown.Header,
                        { className: 'enveloper_dropdown_header' },
                        _react2.default.createElement(
                            'style',
                            null,
                            '\
                        .enveloper_dropdown_header{\
                            position: relative;\
                            width: 30px;\
                            height: 30px;\
                            padding: 0;\
                        }\
                        .enveloper_dropdown_icon{\
                            position: absolute;\
                            top: 8px;\
                            left: 8px;\
                        }\
                        .enveloper_dropdown_contents{\
                            width: 320px;\
                            background-color: #272727;\
                        }\
                        .enveloper_dropdown_header svg:nth-child(3) {\
                            display: none;\
                        }\
                        '
                        ),
                        _react2.default.createElement(_reactUiComponents.Icon, { className: 'enveloper_dropdown_icon', icon: icon })
                    ),
                    _react2.default.createElement(
                        _reactUiComponents.DropDown.Contents,
                        { className: 'enveloper_dropdown_contents', scrollable: false },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(_neosUiEditors2.default, {
                                identifier: propertyName,
                                label: (0, _plowJs.$get)('label', editorOptions) || (0, _plowJs.$get)(['properties', propertyName, 'ui', 'label'], nodeType) || '',
                                editor: (0, _plowJs.$get)('editor', editorOptions),
                                value: value && value.toJS ? value.toJS() : value,
                                hooks: null,
                                options: editorOptions,
                                commit: function commit(value) {
                                    persistChange({
                                        type: 'Neos.Neos.Ui:Property',
                                        subject: contextPath,
                                        payload: {
                                            propertyName: propertyName,
                                            value: value,
                                            nodeDomAddress: {
                                                contextPath: contextPath,
                                                fusionPath: fusionPath
                                            }
                                        }
                                    });
                                },
                                renderSecondaryInspector: function renderSecondaryInspector() {
                                    return null;
                                }
                            })
                        )
                    )
                )
            );
        }
    }]);

    return InlineEditorEnvelope;
}(_react.PureComponent), _class2.childContextTypes = {
    store: _propTypes2.default.object.isRequired,
    globalRegistry: _propTypes2.default.object.isRequired,
    configuration: _propTypes2.default.object.isRequired,
    routes: _propTypes2.default.object.isRequired
}, _temp2)) || _class) || _class);


var findParentFusionPath = function findParentFusionPath(node, contextPath) {
    if (node) {
        var fusionPath = node.getAttribute('data-__neos-fusion-path');
        if (fusionPath && node.getAttribute('data-__neos-node-contextpath') === contextPath) {
            return fusionPath;
        }
        return findParentFusionPath(node.parentNode, contextPath);
    }
    return null;
};

(0, _neosUiExtensibility2.default)('Flowpack.StructuredEditing:EditorEnvelope', {}, function (globalRegistry, _ref2) {
    var routes = _ref2.routes,
        configuration = _ref2.configuration,
        store = _ref2.store;

    var inlineEditorRegistry = globalRegistry.get('inlineEditors');
    var nodeTypesRegistry = globalRegistry.get('@neos-project/neos-ui-contentrepository');
    inlineEditorRegistry.set('Flowpack.StructuredEditing/EditorEnvelope', {
        bootstrap: function bootstrap() {
            return null;
        },
        createInlineEditor: function createInlineEditor(config) {
            var domNode = config.propertyDomNode;
            var fusionPath = findParentFusionPath(domNode, config.contextPath);
            _reactDom2.default.render(_react2.default.createElement(InlineEditorEnvelope, _extends({
                globalRegistry: globalRegistry,
                routes: routes,
                configuration: configuration,
                store: store,
                fusionPath: fusionPath,
                nodeTypesRegistry: nodeTypesRegistry
            }, config)), domNode);
        },
        ToolbarComponent: function ToolbarComponent() {
            return null;
        }
    });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().React;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().PropTypes;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().ReactDOM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createConsumerApi = undefined;

var _createConsumerApi = __webpack_require__(7);

var _createConsumerApi2 = _interopRequireDefault(_createConsumerApi);

var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _readFromConsumerApi2.default)('manifest');
exports.createConsumerApi = _createConsumerApi2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createConsumerApi;

var _package = __webpack_require__(8);

var _manifest = __webpack_require__(9);

var _manifest2 = _interopRequireDefault(_manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createReadOnlyValue = function createReadOnlyValue(value) {
    return {
        value: value,
        writable: false,
        enumerable: false,
        configurable: true
    };
};

function createConsumerApi(manifests, exposureMap) {
    var api = {};

    Object.keys(exposureMap).forEach(function (key) {
        Object.defineProperty(api, key, createReadOnlyValue(exposureMap[key]));
    });

    Object.defineProperty(api, '@manifest', createReadOnlyValue((0, _manifest2.default)(manifests)));

    Object.defineProperty(window, '@Neos:HostPluginAPI', createReadOnlyValue(api));
    Object.defineProperty(window['@Neos:HostPluginAPI'], 'VERSION', createReadOnlyValue(_package.version));
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {"name":"@neos-project/neos-ui-extensibility","version":"1.0.11","description":"Extensibility mechanisms for the Neos CMS UI","main":"./src/index.js","scripts":{"prebuild":"check-dependencies && yarn clean","test":"yarn jest -- -w 2 --coverage","test:watch":"yarn jest -- --watch","build":"exit 0","build:watch":"exit 0","clean":"rimraf ./lib ./dist","lint":"eslint src","jest":"NODE_ENV=test jest"},"devDependencies":{"@neos-project/babel-preset-neos-ui":"1.0.11","@neos-project/jest-preset-neos-ui":"1.0.11"},"dependencies":{"@neos-project/build-essentials":"1.0.11","@neos-project/positional-array-sorter":"1.0.11","babel-core":"^6.13.2","babel-eslint":"^7.1.1","babel-loader":"^7.1.2","babel-plugin-transform-decorators-legacy":"^1.3.4","babel-plugin-transform-object-rest-spread":"^6.20.1","babel-plugin-webpack-alias":"^2.1.1","babel-preset-es2015":"^6.13.2","babel-preset-react":"^6.3.13","babel-preset-stage-0":"^6.3.13","chalk":"^1.1.3","css-loader":"^0.28.4","file-loader":"^1.1.5","json-loader":"^0.5.4","postcss-loader":"^2.0.10","react-dev-utils":"^0.5.0","style-loader":"^0.19.0"},"bin":{"neos-react-scripts":"./bin/neos-react-scripts.js"},"jest":{"preset":"@neos-project/jest-preset-neos-ui"}}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (manifests) {
    return function manifest(identifier, options, bootstrap) {
        manifests.push(_defineProperty({}, identifier, {
            options: options,
            bootstrap: bootstrap
        }));
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiReduxStore;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().ReactUiComponents;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiDecorators;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().reactRedux;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('vendor')().plow;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _readFromConsumerApi = __webpack_require__(0);

var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiEditors;

/***/ })
/******/ ]);
//# sourceMappingURL=Plugin.js.map