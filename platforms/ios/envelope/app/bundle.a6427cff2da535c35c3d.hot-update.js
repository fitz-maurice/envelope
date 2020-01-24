webpackHotUpdate("bundle",{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./pages/Home.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
const camera = __webpack_require__("../node_modules/nativescript-camera/camera.js");

const imageModule = __webpack_require__("../node_modules/@nativescript/core/ui/image/image.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  computed: {
    message() {
      return 'Blank {N}-Vue app';
    }

  },
  methods: {
    launch() {
      camera.requestPermissions().then(function success() {
        camera.takePicture().then(function (imageAsset) {
          console.log("Result is an image asset instance");
          var image = new imageModule.Image();
          image.src = imageAsset;
        }).catch(function (err) {
          console.log("Error -> " + err.message);
        });
      }, function failure() {// permission request rejected
        // ... tell the user ...
      });
    }

  }
});

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcGFnZXMvSG9tZS52dWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEEsR0FEQTtBQU1BO0FBQ0E7QUFDQSx1Q0FDQTtBQUNBLDZCQUNBLElBREEsQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBTEEsRUFLQSxLQUxBLENBS0E7QUFDQTtBQUNBLFNBUEE7QUFRQSxPQVZBLEVBV0Esb0JBQ0E7QUFDQTtBQUNBLE9BZEE7QUFnQkE7O0FBbEJBO0FBTkEsRyIsImZpbGUiOiJidW5kbGUuYTY0MjdjZmYyZGE1MzVjMzVjM2QuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPFBhZ2U+XG4gICAgPEFjdGlvbkJhciB0aXRsZT1cIkVudmVsb3BlXCIgZmxhdD1cInRydWVcIj4gPC9BY3Rpb25CYXI+XG5cbiAgICA8R3JpZExheW91dD5cbiAgICAgIDxMYWJlbCBjbGFzcz1cImluZm9cIj5cbiAgICAgICAgPEZvcm1hdHRlZFN0cmluZz5cbiAgICAgICAgICA8U3BhbiBjbGFzcz1cImZhc1wiIHRleHQuZGVjb2RlPVwiJiN4ZjEzNTsgXCIgLz5cbiAgICAgICAgICA8U3BhbiA6dGV4dD1cIm1lc3NhZ2VcIiAvPlxuICAgICAgICA8L0Zvcm1hdHRlZFN0cmluZz5cbiAgICAgIDwvTGFiZWw+XG4gICAgICA8QnV0dG9uXG4gICAgICAgIHRleHQ9XCJMYXVuY2ggQ2FtZXJhXCJcbiAgICAgICAgQHRhcD1cImxhdW5jaCgpXCJcbiAgICAgICAgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgbS10LTIwXCJcbiAgICAgID48L0J1dHRvbj5cbiAgICA8L0dyaWRMYXlvdXQ+XG4gIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5jb25zdCBjYW1lcmEgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtY2FtZXJhJyk7XG5jb25zdCBpbWFnZU1vZHVsZSA9IHJlcXVpcmUoJ3Rucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2UnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wdXRlZDoge1xuICAgIG1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gJ0JsYW5rIHtOfS1WdWUgYXBwJztcbiAgICB9LFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgbGF1bmNoKCkge1xuICAgICAgY2FtZXJhLnJlcXVlc3RQZXJtaXNzaW9ucygpLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgY2FtZXJhLnRha2VQaWN0dXJlKClcbiAgICAudGhlbihmdW5jdGlvbiAoaW1hZ2VBc3NldCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCBpcyBhbiBpbWFnZSBhc3NldCBpbnN0YW5jZVwiKTtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IGltYWdlTW9kdWxlLkltYWdlKCk7XG4gICAgICAgIGltYWdlLnNyYyA9IGltYWdlQXNzZXQ7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0+IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiBmYWlsdXJlKCkge1xuICAgICAgICAgIC8vIHBlcm1pc3Npb24gcmVxdWVzdCByZWplY3RlZFxuICAgICAgICAgIC8vIC4uLiB0ZWxsIHRoZSB1c2VyIC4uLlxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICd+QG5hdGl2ZXNjcmlwdC90aGVtZS9zY3NzL3ZhcmlhYmxlcy9ibHVlJztcblxuLy8gQ3VzdG9tIHN0eWxlc1xuLmZhcyB7XG4gIEBpbmNsdWRlIGNvbG9yaXplKCRjb2xvcjogYWNjZW50KTtcbn1cblxuLmluZm8ge1xuICBmb250LXNpemU6IDIwO1xuICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==