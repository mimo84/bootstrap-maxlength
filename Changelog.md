## Changelog

### 1.9.0

* Add zIndex support by @ASKemp
* Fixed file input counter (@djibe)
* Update dependencies

### 1.8.0

* Dropped Grunt (*Unmaintained*)
* Moved project to **NodeJS**
* Changed default parameters for **Bootstrap 4.4.1** and updated docs
* Fixed : build files located in `/dist` folder
* TODO : unit tests with qunit, travis builds

### 1.7.0
* Restructured distribution files position from root folder to /dist folder

### 1.6.1
* Added more tests around the functionalities of the plugin
* Fixed issues around the **alwaysShow** option

### 1.6.0
* Added new custom events: maxlength.reposition, maxlength.shown, maxlength.hidden. Thanks to dr-nick.
* Bumped up required jQuery to 1.9.x
* Added option `placement` for custom placement handler. Thanks to Kreegr
* Extended `message` option. Now it can also be optionally a function. Thanks to Vincent Pizzo

### 1.5.7
* Fixed issue with bower

### 1.5.6
*   Added over maxlength functionality with customMaxAttribute
*   Added twoCharLinebreak option

### 1.5.5
*   Implemented input event rather than keydown to improve usability
* Fixed jshint, jscs errors

### 1.5.4

* When an input with associated maxlength element is removed, maxlength is also removed.

### 1.5.3

* Fixed #40, error on resize event.

### 1.5.2

*   Fixed #44 (pasted text in can cause it to go over the max length)

### 1.5.1

*   Added self protection of multiple focus events
*   Added back detection of window resizing

### 1.5.0

*   Removed window.resize event
*   Maxlength is created and destroyed each time
*   Fixed Doesn't update the limit after input's maxlength attribute was changed [#31](https://github.com/mimo84/bootstrap-maxlength/issues/31)
*   Added Gruntfile
*   Added qunit unit tests

### 1.4.2

* Fixed issue with counting when the user moves with shift+tab keyboard shortcut.
* Replaced the warningClass limitReachedClass options to use labels rather than badges for Bootstrap 3.0 better compatibility.

### 1.4.1

* Added support for TAB key when the maxlength is reached.
