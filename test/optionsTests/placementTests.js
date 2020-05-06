$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('placement object option', {
    beforeEach: function () {
      maxlengthInput = $('<input type="text" maxlength="10" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({
        placement: {
          top: '5px',
          left: '6px',
          bottom: '7px',
          right: '10px'
        }
      });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('css top placement from object placement option', function (assert) {
    maxlengthInput.focus();
    assert.ok(window.getComputedStyle(document.querySelector('.bootstrap-maxlength')).top === '5px', 'maxlength has expected top style');
  });

  QUnit.test('css left placement from object placement option', function (assert) {
    maxlengthInput.focus();
    assert.ok(window.getComputedStyle(document.querySelector('.bootstrap-maxlength')).left === '6px', 'maxlength has expected left style');
  });

  QUnit.test('css right placement from object placement option', function (assert) {
    maxlengthInput.focus();
    assert.ok(window.getComputedStyle(document.querySelector('.bootstrap-maxlength')).right === '10px', 'maxlength has expected right style');
  });

  QUnit.test('css bottom placement from object placement option', function (assert) {
    maxlengthInput.focus();
    assert.ok(window.getComputedStyle(document.querySelector('.bootstrap-maxlength')).bottom === '7px', 'maxlength has expected bottom style');
  });
});
