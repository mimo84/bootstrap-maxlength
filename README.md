# [Bootstrap MaxLength](http://mimo84.github.com/bootstrap-maxlength/)


This plugin integrates by default with Twitter bootstrap using badges to display the maximum length of the field where the user is inserting text. 
This plugin uses the HTML5 attribute "maxlength" to work.


The indicator badge show up on focusing on the element, and disappear when the focus is lost.

## Configurable options

 * **alwaysShow**: if true the threshold will be ignored and the remaining length indication will be always showing up while typing or on focus on the input. Default: false.
 * **threshold**: this is a number indicating how many chars are left to start displaying the indications. Default: 10.
 * **warningClass**: it's the class of the element with the indicator. By default is the bootstrap "badge badge-info" but can be changed to anything you'd like.
 * **limitReachedClass**: it's the class the element gets when the limit is reached. Default is "badge badge-warning".
 * **separator**: represents the separator between the number of typed chars and total number of available chars. Default is "/".
 * **preText**: is a string of text that can be outputted in front of the indicator. preText is empty by default.
 * **postText**: is a string outputted after the indicator. postText is empty by default.
 * **placement**: is a string, define where to output the counter. Possible values are: **bottom** ( *default option* ), **left**, **top**, **right**, **bottom-right**, **top-right**, **top-left**, **bottom-left** and **centered-right**.

## Examples

Basic implementation:

    $('input[maxlength]').maxlength();

Change the threshold value:

    $('input.className').maxlength({
        threshold: 20
    });

An example will all the configurable options:

    $('input.className').maxlength({
        alwaysShow: true,
        threshold: 10,
        warningClass: "label label-info",
        limitReachedClass: "label label-warning",
        placement: 'top',
        preText: 'used ',
        separator: ' of ',
        postText: ' chars.'
    });