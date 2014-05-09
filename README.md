angular-backsplash
=================

An angular directive to fill a block element with an image.

### Params:

 * **url** - Provide the url of the image to display.  This value is watched so you can change it to update the image.
 * **fade** - When switching images, whether or not to fade from one image to the other:
   * true - fade for 1 second
   * fast - fade for 1/2 second
   * slow - fade for 2 seconds
 * **mode** - Changes how the container element is filled with the image.  See [a demo](http://runnable.com/U2zwn1MsJ-NOLwig/angular-backsplash-demos-for-javascript-and-angular-js) showing each mode.
   * resize - default, aspect ratio remains the same, either the height or width equals container
   * stretch - aspect ratio changes so that the image fills the container
   * fill - image grows proportionally to fill container, overflow is hidden


Examples:

#### Static image
```
<div backsplash url="http://lorempixel.com/800/600/" style="width: 400px; height: 200px"></div>
```

#### Image url from angular scope
```
<div backsplash mode="stretch" fade="slow" url="{{imageUrl}}" style="width: 400px; height: 200px"></div>
```
