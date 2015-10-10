$(function () {
  'use strict';

  var maxlengthInput;

  module('customMaxAttribute', {
    setup: function () {
      maxlengthInput = $('<input type="text" data-notifylength="10" maxlength="50" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ customMaxAttribute: 'data-notifylength' });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Allows over maxlength', function () {
    maxlengthInput.val('this is over the custom maxlength');
    maxlengthInput.focus();

    ok($('.bootstrap-maxlength').html() === '33 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 26 / 10.');
  });

  test('Adds overmax class to element', function () {
    maxlengthInput.val('this is over the custom maxlength');
    maxlengthInput.focus();

    ok(maxlengthInput.hasClass('overmax'), '"overmax" class added to element');
  });

  test('Maxlength attribute remains', function () {
    maxlengthInput.val('this is over the custom maxlength');
    maxlengthInput.focus();

    ok(maxlengthInput.is('[maxlength]'), 'Maxlength attribute remains, but is ignored by this plugin.');
  });

  module('redundant customMaxAttribute', {
    setup: function () {
      maxlengthInput = $('<input type="text" data-notifylength="50" maxlength="10" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({ customMaxAttribute: 'data-notifylength' });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('custom maxlength attribute is ignored', function () {
    maxlengthInput.val('this is over the native maxlength');
    maxlengthInput.focus();

    ok($('.bootstrap-maxlength').html() === '33 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 26 / 10.');
  });

});
