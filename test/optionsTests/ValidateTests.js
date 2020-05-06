$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('validate', {
    beforeEach: function () {
      maxlengthInput = $('<textarea maxlength="9"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ validate: true });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('Text length by character', function (assert) {
    maxlengthInput
      .val('0°1°2°3°4°5°6°7°8°9°')
      .trigger('input');

    var len = maxlengthInput.val().length;
    var msg = [
      'Current length', len, '/ 9.',
      'Expected 9 / 9.'
    ].join(" ");
    assert.ok(len === 9, msg);
  });

});
