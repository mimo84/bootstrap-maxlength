$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('alwaysShow', {
    beforeEach: function () {
      maxlengthInput = $('<input type="text" maxlength="20" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ alwaysShow: true });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('The badge is always visible', function (assert) {
    maxlengthInput.val('Hello World');

    maxlengthInput.focus();
    assert.ok($('.bootstrap-maxlength').is(':visible'), 'Maxlength is visible when input:focus');

    maxlengthInput.blur();
    assert.ok($('.bootstrap-maxlength').not(':visible'), 'Maxlength is not visible when input:not(:focus)');
  });

});
