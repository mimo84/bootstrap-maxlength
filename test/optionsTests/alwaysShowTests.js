$(function () {
  'use strict';

  var maxlengthInput;

  module('alwaysShow', {
    setup: function () {
      maxlengthInput = $('<input type="text" maxlength="20" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ alwaysShow: true });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('The badge is always visible', function () {
    maxlengthInput.val('Hello World');

    maxlengthInput.focus();
    ok($('.bootstrap-maxlength').is(':visible'), 'Maxlength is visible when input:focus');

    maxlengthInput.blur();
    ok($('.bootstrap-maxlength').not(':visible'), 'Maxlength is not visible when input:not(:focus)');
  });

});
