$(function () {
  'use strict';

  var maxlengthInput;

  module('utf8', {
    setup: function () {
      maxlengthInput = $('<textarea maxlength="9"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ utf8: true });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Validate text length by byte', function() {
    maxlengthInput
      .val('0°1°2°3°4°5°6°7°8°9°') // ° is two bytes each
      .maxlength({ utf8: true, validate: true })
      .trigger('input');

    var len = maxlengthInput.val().length;
    var msg = [
      'Current length', len, '/ 9.',
      'Expected 6 / 9.'
    ].join(" ");
    ok(len === 6, msg);
  });

});
