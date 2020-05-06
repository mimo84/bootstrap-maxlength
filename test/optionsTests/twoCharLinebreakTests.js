$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('textarea', {
    beforeEach: function () {
      maxlengthInput = $('<textarea maxlength="10"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ twoCharLinebreak: false });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('Newlines are not counted twice', function (assert) {
    maxlengthInput.val('t\r\nt');

    maxlengthInput.maxlength({ twoCharLinebreak: false });
    maxlengthInput.focus();

    assert.ok($('.bootstrap-maxlength').html() === '3 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 3 / 10.');

  });

});
