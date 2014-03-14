angular.module("backsplash", [])
.directive("backsplash", function () {
  return {
    restrict: 'AE',
    scope: {
      mode: '@',
      url: '@'
    },
    link: function (scope, elem, attrs) {
      var showingImg = null;
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
      }
      var placeImage = function (img) {
        console.log("Placing image", img);
        resize(img);
        elem.html('');
        elem.append(img);
        showingImg = img;
        scope.$emit('imageplaced');
      }
      var loadImage = function (url) {
        console.log("Loading image", url);
        var img = new Image();
        img.onload = function () {
            scope.$emit('imageloaded');
            placeImage(img);
        };
        img.src = url;
      }
      
      scope.$watch('url', function () { loadImage(scope.url);});
      window.onresize = function () {
        console.log("Window was resized", showingImg);
        resize(showingImg);
      };
    }
  };
});