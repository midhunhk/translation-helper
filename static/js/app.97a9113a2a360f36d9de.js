webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Hello__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Hello___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Hello__);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Hello',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Hello___default.a
  }]
}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(13)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(22),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Spinner__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TranslateForm__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TranslateForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_TranslateForm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TranslationResult__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TranslationResult___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_TranslationResult__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





// Instantiate the Translation Engine
let Translations = __webpack_require__(10)();

$("#modalWindow").hide();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: {
    Spinner: __WEBPACK_IMPORTED_MODULE_0__components_Spinner___default.a,
    TranslateForm: __WEBPACK_IMPORTED_MODULE_1__components_TranslateForm___default.a,
    TranslationResult: __WEBPACK_IMPORTED_MODULE_2__components_TranslationResult___default.a
  },
  data: function () {
    return {
      htmlResponse: 'Add key name, text for translation and language codes'
    };
  },
  methods: {
    translateText: function (propertyName, text, languages) {
      $("#modalWindow").show();
      Translations.translateText(propertyName, text, languages,
      // Arrow function as return handler to keep the context
      data => {
        this.htmlResponse = data;
        $("#modalWindow").hide();
      });
    },
    resetData: function () {
      Translations.reset();
    }
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'translateForm',
  data() {
    return {
      propertyName: '',
      translateText: '',
      languagesList: ''
    };
  },
  methods: {
    addEntry(e) {
      this.$emit('propertyAdded', this.propertyName, this.translateText, this.languagesList);
      e.preventDefault();
    },
    resetData(e) {
      this.$emit('resetData');
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'translationResult',
  props: ['translatedText']
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translations Engine Version 2
 */
var Translations = function () {
  const API_KEY = "trnsl.1.1.20171003T115547Z.1ac7ccff547f1d41.3eece27cab43d9d5615fe8c12471925feccd00d2";
  const API_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?";

  var translationsData = {};
  var $container = $("#translationRowContainer");

  translateText = function (propertyName, translateText, languagesList, done) {
    var languages = languagesList.split(",");

    if (!propertyName || !translateText || !languagesList) {
      toastr.error("Input Required");
      return;
    }

    // Assuming source language is "en"
    addEntry(propertyName, translateText, "en");

    // Iterate over each language and fire Yandex Translate API calls to translate
    // the given text into each language and store as entries
    let requestsCount = languages.length;
    $.each(languages, function (index, language) {
      var translateUrl = API_URL + 'key=' + API_KEY + '&lang=' + language + '&text=' + translateText;

      axios.get(translateUrl).then(function (response) {
        var translated = response.data.text[0];
        // toastr.info(propertyName + " in " + language + " is " + translated);
        addEntry(propertyName, translated, language);
        requestsCount--;
        if (requestsCount <= 0) {
          // toastr.info("Processing completed");
          done(htmlResult());
        }
      });
    });
  }, addEntry = function (name, text, lang) {
    var entry = '&lt;string name="' + name + '"&gt;' + text + '&lt;/string&gt;';
    //var entry = '\<string name="' + name +'"\>' + text +'\</string\>';

    var translations = translationsData[lang];
    if (!translations) {
      translations = [];
      translationsData[lang] = translations;
    }

    translations.push(entry);
  }, htmlResult = function () {
    var htmlData = "";

    $.each(translationsData, function (index, entries) {
      if (!!index) {
        htmlData += "<span class='item'>" + "&lt;-- Language " + index + " --&gt;</span>";
        // htmlData += "<span class='item'>" + " Language " + index + "</span> \n";
      }

      $(entries).each(function (index, value) {
        htmlData += "<span class='item'>" + value + "</span> \n";
      });
    });
    return htmlData;
  }, reset = function () {
    translationsData = {};
  };

  return {
    translateText: translateText,
    reset: reset
  };
};

module.exports = Translations;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_resource__ = __webpack_require__(4);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.





__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_vue_resource__["a" /* default */]);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(12)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  "data-v-5d10777d",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(14)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(15)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(24),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "translateForm"
    }
  }, [_c('form', {
    staticClass: "form-inline p-2",
    attrs: {
      "id": "transForm"
    },
    on: {
      "submit": _vm.addEntry
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.languagesList),
      expression: "languagesList"
    }],
    staticClass: "p-1",
    attrs: {
      "type": "text",
      "placeholder": "Comma separated Language codes"
    },
    domProps: {
      "value": (_vm.languagesList)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.languagesList = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.propertyName),
      expression: "propertyName"
    }],
    staticClass: "p-1",
    attrs: {
      "type": "text",
      "placeholder": "Property Name"
    },
    domProps: {
      "value": (_vm.propertyName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.propertyName = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.translateText),
      expression: "translateText"
    }],
    staticClass: "p-1",
    attrs: {
      "type": "text",
      "placeholder": "Text for translation"
    },
    domProps: {
      "value": (_vm.translateText)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.translateText = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "btn cyan darken-4 mt-1",
    attrs: {
      "type": "submit",
      "value": "Translate"
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "btn teal darken-1 btn-sm mt-2",
    attrs: {
      "type": "button",
      "value": "Reset"
    },
    on: {
      "click": _vm.resetData
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  }, [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('h2', [_vm._v("Essential Links")]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('h2', [_vm._v("Ecosystem")]), _vm._v(" "), _vm._m(1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "https://vuejs.org",
      "target": "_blank"
    }
  }, [_vm._v("Core Docs")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://forum.vuejs.org",
      "target": "_blank"
    }
  }, [_vm._v("Forum")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://gitter.im/vuejs/vue",
      "target": "_blank"
    }
  }, [_vm._v("Gitter Chat")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://twitter.com/vuejs",
      "target": "_blank"
    }
  }, [_vm._v("Twitter")])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://vuejs-templates.github.io/webpack/",
      "target": "_blank"
    }
  }, [_vm._v("Docs for This Template")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "http://router.vuejs.org/",
      "target": "_blank"
    }
  }, [_vm._v("vue-router")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://vuex.vuejs.org/",
      "target": "_blank"
    }
  }, [_vm._v("vuex")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://vue-loader.vuejs.org/",
      "target": "_blank"
    }
  }, [_vm._v("vue-loader")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://github.com/vuejs/awesome-vue",
      "target": "_blank"
    }
  }, [_vm._v("awesome-vue")])])])
}]}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "outerWrapper"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "text-center container mt-1",
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "row text-xs-left"
  }, [_c('div', {
    staticClass: "col-lg-4 col-md-8 teal lighten-5 black-text p-m rounded-left animated fadeIn"
  }, [_c('TranslateForm', {
    on: {
      "propertyAdded": _vm.translateText,
      "resetData": _vm.resetData
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-lg-8 col-md-16 cyan darken-4 white-text text-left rounded-right animated fadeInDown"
  }, [_c('TranslationResult', {
    attrs: {
      "translatedText": _vm.htmlResponse
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "row",
    attrs: {
      "id": "modalWindow"
    }
  }, [_c('Spinner')], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "navbar navbar-toggleable-md navbar-dark scrolling-navbar cyan darken-4"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('a', {
    staticClass: "navbar-brand col-md-8",
    attrs: {
      "href": "#"
    }
  }, [_c('h3', {
    attrs: {
      "id": "appTitle"
    }
  }, [_vm._v("Translation Helper 2.0.10")])]), _vm._v(" "), _c('div', {
    staticClass: "collapse navbar-collapse col-md-4 text-right",
    attrs: {
      "id": "navbarNav"
    }
  }, [_c('ul', {
    staticClass: "navbar-nav mr-auto"
  }, [_c('small', {
    staticClass: "text-muted"
  }, [_c('a', {
    attrs: {
      "href": "http://translate.yandex.com/"
    }
  }, [_vm._v("Powered by Yandex.Translate")])])])])])])
}]}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner"
  }, [_c('div', {
    staticClass: "rect1"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect2"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect3"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect4"
  }), _vm._v(" "), _c('div', {
    staticClass: "rect5"
  })])
}]}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "single-news"
  }, [_c('div', {
    staticClass: "row pt-1"
  }, [_c('div', {
    staticClass: "col-md-12"
  }, [_c('div', {
    staticClass: "text-left",
    domProps: {
      "innerHTML": _vm._s(_vm.translatedText)
    }
  })])])])
},staticRenderFns: []}

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[11]);
//# sourceMappingURL=app.97a9113a2a360f36d9de.js.map