$(function () {
  'use strict';

  var maxlengthInput;

  module('textarea', {
    setup: function () {
      maxlengthInput = $('<textarea maxlength="10"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ twoCharLinebreak: false });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Newlines are not counted twice', function () {
    maxlengthInput.val('t\r\nt');

    maxlengthInput.maxlength({ twoCharLinebreak: false });
    maxlengthInput.focus();

    ok($('.bootstrap-maxlength').html() === '3 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 3 / 10.');

  });

});
