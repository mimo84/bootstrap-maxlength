$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('customMaxAttribute', {
    beforeEach: function () {
      maxlengthInput = $('<input type="text" data-notifylength="10" maxlength="50" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ customMaxAttribute: 'data-notifylength' });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('Allows over maxlength', function (assert) {
    maxlengthInput.val('this is over the custom maxlength');
    maxlengthInput.focus();

    assert.ok($('.bootstrap-maxlength').html() === '33 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 26 / 10.');
  });

  QUnit.test('Adds overmax class to element', function (assert) {
    maxlengthInput.val('this is over the custom maxlength');
    maxlengthInput.focus();

    assert.ok(maxlengthInput.hasClass('overmax'), '"overmax" class added to element');
  });

  QUnit.test('Maxlength attribute remains', function (assert) {
    maxlengthInput.val('this is over the custom maxlength');
    maxlengthInput.focus();

    assert.ok(maxlengthInput.is('[maxlength]'), 'Maxlength attribute remains, but is ignored by this plugin.');
  });

  QUnit.module('redundant customMaxAttribute', {
    beforeEach: function () {
      maxlengthInput = $('<input type="text" data-notifylength="50" maxlength="10" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ customMaxAttribute: 'data-notifylength' });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('custom maxlength attribute is ignored', function (assert) {
    maxlengthInput.val('this is over the native maxlength');
    maxlengthInput.focus();

    assert.ok($('.bootstrap-maxlength').html() === '33 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 26 / 10.');
  });

});
