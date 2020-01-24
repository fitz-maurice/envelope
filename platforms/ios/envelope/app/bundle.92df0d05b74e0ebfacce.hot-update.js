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
          console.log('Result is an image asset instance');
          var image = new imageModule.Image();
          image.src = imageAsset;
        }).catch(function (err) {
          console.log('Error -> ' + err.message);
        });
      }, function failure() {// permission request rejected
        // ... tell the user ...
      });
    }

  }
});

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcGFnZXMvSG9tZS52dWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEEsR0FEQTtBQU1BO0FBQ0E7QUFDQSx1Q0FDQTtBQUNBLGVBQ0EsV0FEQSxHQUVBLElBRkEsQ0FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBTkEsRUFPQSxLQVBBLENBT0E7QUFDQTtBQUNBLFNBVEE7QUFVQSxPQVpBLEVBYUEsb0JBQ0E7QUFDQTtBQUNBLE9BaEJBO0FBa0JBOztBQXBCQTtBQU5BLEciLCJmaWxlIjoiYnVuZGxlLjkyZGYwZDA1Yjc0ZTBlYmZhY2NlLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxQYWdlPlxuICAgIDxBY3Rpb25CYXIgdGl0bGU9XCJFbnZlbG9wZVwiIGZsYXQ9XCJ0cnVlXCI+IDwvQWN0aW9uQmFyPlxuXG4gICAgPEdyaWRMYXlvdXQ+XG4gICAgICA8TGFiZWwgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgIDxGb3JtYXR0ZWRTdHJpbmc+XG4gICAgICAgICAgPFNwYW4gY2xhc3M9XCJmYXNcIiB0ZXh0LmRlY29kZT1cIiYjeGYxMzU7IFwiIC8+XG4gICAgICAgICAgPFNwYW4gOnRleHQ9XCJtZXNzYWdlXCIgLz5cbiAgICAgICAgPC9Gb3JtYXR0ZWRTdHJpbmc+XG4gICAgICA8L0xhYmVsPlxuICAgICAgPEJ1dHRvblxuICAgICAgICB0ZXh0PVwiTGF1bmNoIENhbWVyYVwiXG4gICAgICAgIEB0YXA9XCJsYXVuY2goKVwiXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG0tdC0yMFwiXG4gICAgICA+PC9CdXR0b24+XG4gICAgPC9HcmlkTGF5b3V0PlxuICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuY29uc3QgY2FtZXJhID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWNhbWVyYScpO1xuY29uc3QgaW1hZ2VNb2R1bGUgPSByZXF1aXJlKCd0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcHV0ZWQ6IHtcbiAgICBtZXNzYWdlKCkge1xuICAgICAgcmV0dXJuICdCbGFuayB7Tn0tVnVlIGFwcCc7XG4gICAgfSxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGxhdW5jaCgpIHtcbiAgICAgIGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKS50aGVuKFxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKCkge1xuICAgICAgICAgIGNhbWVyYVxuICAgICAgICAgICAgLnRha2VQaWN0dXJlKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGltYWdlQXNzZXQpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdCBpcyBhbiBpbWFnZSBhc3NldCBpbnN0YW5jZScpO1xuICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgaW1hZ2VNb2R1bGUuSW1hZ2UoKTtcbiAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VBc3NldDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciAtPiAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uIGZhaWx1cmUoKSB7XG4gICAgICAgICAgLy8gcGVybWlzc2lvbiByZXF1ZXN0IHJlamVjdGVkXG4gICAgICAgICAgLy8gLi4uIHRlbGwgdGhlIHVzZXIgLi4uXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgJ35AbmF0aXZlc2NyaXB0L3RoZW1lL3Njc3MvdmFyaWFibGVzL2JsdWUnO1xuXG4vLyBDdXN0b20gc3R5bGVzXG4uZmFzIHtcbiAgQGluY2x1ZGUgY29sb3JpemUoJGNvbG9yOiBhY2NlbnQpO1xufVxuXG4uaW5mbyB7XG4gIGZvbnQtc2l6ZTogMjA7XG4gIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcbn1cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9