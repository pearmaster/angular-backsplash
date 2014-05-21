angular.module("backsplash", [])
.directive("backsplash", function ($timeout) {
  return {
    restrict: 'AE',
    scope: {
      mode: '@',
      url: '@',
      fade: '@'
    },
    link: function (scope, elem, attrs) {
      elem.css({
        overflow: "hidden",
        position: "relative"
      });
      var showingImg = null;
      var prevImg = null;
      var z = -1;
      if (typeof scope.mode === 'undefined') {
        scope.mode = "false";
      }
      if (typeof scope.fade === 'undefined') {
        scope.fade = 'false';
      }

      var resize = function (img) {
        if (img == null) return;
        var containerRatio = elem[0].clientWidth/elem[0].clientHeight;
        var imageRatio = img.naturalWidth / img.naturalHeight;
        if (scope.mode == null || scope.mode == 'resize') {
          if (imageRatio > containerRatio) {
            img.width = elem[0].clientWidth;
            img.height = img.width / imageRatio;
          } else {
            img.height = elem[0].clientHeight;
            img.width = img.height * imageRatio;
          }
        } else if (scope.mode == 'stretch') {
          img.height = elem[0].clientHeight;
          img.width = elem[0].clientWidth;
        } else if (scope.mode == 'fill') {
          if (imageRatio < containerRatio) {
            img.width = elem[0].clientWidth;
            img.height = img.width / imageRatio;
          } else {
            img.height = elem[0].clientHeight;
            img.width = img.height * imageRatio;
          }
        } else {
          img.height = img.naturalHeight;
          img.width = img.naturalWidth;
        }
        var delta_y = (elem[0].clientHeight - img.height)/2;
        var delta_x = (elem[0].clientWidth - img.width)/2;
        angular.element(img).css({
          position: 'absolute',
          top: delta_y + "px",
          left: delta_x + "px",
        });
      };

      var placeImage = function (img) {
        console.log("Placing image", img);

        var t = 0;
        if (angular.isString(scope.fade)) {
          if (scope.fade.toLowerCase() == "true") {
            t = 1;
          } else if (scope.fade.toLowerCase() == "slow") {
            t = 2;
          } else if (scope.fade.toLowerCase() == "fast") {
            t = 0.5;
          } else {
            t = parseFloat(scope.fade);
          }
        } else if (angular.isNumber(scope.fade)) {
          t = scope.fade;
        }

        angular.element(img).css({
          opacity: 0,
          transition: "opacity "+t+"s",
          zIndex: z--
        });
        resize(img);
        elem.append(img);

        prevImg = showingImg;
        showingImg = img;

        // Fade out previous image
        angular.element(prevImg).css({
          opacity:0
        });
        // We need to put the fade-in css into a timeout so that we make sure
        // sure the browser places the image in the dom before starting fade-in
        $timeout(function () {
          angular.element(showingImg).css({
            opacity:1
          });
        }, 20);

        // After the previous image has faded out (we use timeout to determine
        // this), remove the image from the dom.
        $timeout(function () {
          if (prevImg !== null) {
            console.log("Removing previous image");
            angular.element(prevImg).remove();
            prevImg = null;
          }
        }, ((t*1000)+25));
        scope.$emit('imageplaced');
      };

      var loadImage = function (url) {
        console.log("Loading image", url);
        var img = new Image();
        img.onload = function () {
            scope.$emit('imageloaded');
            placeImage(img);
        };
        img.src = url;
      };

      scope.$watch('url', function () {
        loadImage(scope.url);
      });

      window.onresize = function () {
        console.log("Window was resized", showingImg);
        resize(showingImg);
        if (prevImg !== null) {
          resize(prevImg);
        }
      };
    }
  };
});
