angular-backsplash
=================

An angular directive to fill a block element with an image.

Params:

 * **url** - Provide the url of the image to display.  This value is watched so you can change it to update the image.
 * **fade** - When switching images, whether or not to fade from one image to the other:
   * true - fade for 1 second
   * fast - fade for 1/2 second
   * slow - fade for 2 seconds
 * **mode** - Changes how the container element is filled with the image.  See [a demo](http://web-172cde2e-9502-4fbd-b92f-3bfa3b1a69fd.runnable.com/) showing each mode.
   * resize - default, aspect ratio remains the same, either the height or width equals container
   * stretch - aspect ratio changes so that the image fills the container
   * fill - image grows proportionally to fill container, overflow is hidden
