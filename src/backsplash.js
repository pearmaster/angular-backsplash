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
        if (scope.fade.toLowerCase() == "true") {
          t = 1;
        } else if (scope.fade.toLowerCase() == "slow") {
          t = 2;
        } else if (scope.fade.toLowerCase() == "fast") {
          t = 0.5;
        }

        angular.element(img).css({
          opacity: 0,
          transition: "opacity "+t+"s ease-in-out",
          zIndex: z--
        });
        resize(img);
        elem.append(img);

        prevImg = showingImg;
        showingImg = img;

        angular.element(prevImg).css({
          opacity:0,
        });
        angular.element(showingImg).css({
          opacity:1
        });
        $timeout(function () {
          if (prevImg !== null) {
            console.log("Removing previous image");
            angular.element(prevImg).remove();
            prevImg = null;
          }
        }, ((t*1000)+5));
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
