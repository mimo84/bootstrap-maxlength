$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('textarea', {
    beforeEach: function () {
      maxlengthInput = $('<textarea maxlength="10"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('Newlines are counted twice', function (assert) {
    maxlengthInput.val('t\r\nt');

    maxlengthInput.maxlength();
    maxlengthInput.focus();

    assert.ok($('.bootstrap-maxlength').html() === '4 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 4 / 10.');
  });

  QUnit.test('Message can be a customizable function', function (assert) {
    $('.bootstrap-maxlength').remove();
    $('#qunit-fixture').empty();
    maxlengthInput = $('<input type="text" maxlength="10" />').appendTo('#qunit-fixture');
    maxlengthInput.maxlength({
      message: function (currentText, maxLength) {
        return '' + (currentText.length * 8) + ' Bytes / ' + (maxLength * 8) + ' Bytes';
      }
    });
    maxlengthInput.val('Test!');
    maxlengthInput.focus();

    assert.ok($('.bootstrap-maxlength').html() === '40 Bytes / 80 Bytes', 'Message override is not functioning properly');
  });

  QUnit.test('Message can be a customizable string', function (assert) {
    $('.bootstrap-maxlength').remove();
    $('#qunit-fixture').empty();
    maxlengthInput = $('<input type="text" maxlength="10" />').appendTo('#qunit-fixture');
    maxlengthInput.maxlength({
      message: 'You have typed %charsTyped% chars, %charsRemaining% of %charsTotal% remaining'
    });
    maxlengthInput.val('Testing');
    maxlengthInput.focus();

    assert.ok($('.bootstrap-maxlength').html() === 'You have typed 7 chars, 3 of 10 remaining', 'Message override is not functioning properly');
  });

});
