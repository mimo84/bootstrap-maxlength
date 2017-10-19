$(function () {
  'use strict';

  var maxlengthInput;

  module('validate', {
    setup: function () {
      maxlengthInput = $('<textarea maxlength="9"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ validate: true });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Text length by character', function () {
    maxlengthInput
      .val('0°1°2°3°4°5°6°7°8°9°')
      .trigger('input');

    var len = maxlengthInput.val().length;
    var msg = [
      'Current length', len, '/ 9.',
      'Expected 9 / 9.'
    ].join(" ");
    ok(len === 9, msg);
  });

});
