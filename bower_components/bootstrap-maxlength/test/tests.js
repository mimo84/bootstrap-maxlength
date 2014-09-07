$(function () {
  'use strict';

  var maxlengthInput;

  module('maxlength', {
    setup: function () {
      maxlengthInput = $('<input type="text" maxlength="10" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Maxlength is displayed correctly', function () {
    maxlengthInput.focus();
    ok($('.bootstrap-maxlength').length, 'maxlength was inserted');
  });

  test('Maxlength is visible on focus', function () {
    maxlengthInput.focus();
    ok($('.bootstrap-maxlength').is(':visible'), 'Maxlength is visible');
  });

  test('Maxlength is removed on blur', function () {
    maxlengthInput.maxlength().focus().blur();
    ok(!$('.bootstrap-maxlength').length, 'Maxlength is removed on blur');
  });

  test('Maxlength updates the maxlength', function () {
    maxlengthInput.focus();

    // Change the maxlength attribute
    maxlengthInput.blur().attr('maxlength', '142').focus();

    ok($('.bootstrap-maxlength').html() === '0 / 142', 'Maxlength updated the field');

  });

  test('Removing an element with the maxlength removes the maxlength if any.', function () {
    maxlengthInput.maxlength().focus();
    maxlengthInput.remove();
    ok($('.bootstrap-maxlength').length === 0, 'Maxlength field removed with the input');

  });

  test('The focus event is triggered multiple times without a blur', function () {
    maxlengthInput.focus().focus().focus().focus();
    ok($('.bootstrap-maxlength').length === 1, 'Maxlength visualized only once after multiple focuses');
  });

  module('textarea', {
    setup: function () {
      maxlengthInput = $('<textarea maxlength="10"></textarea>')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Newlines are not counted twice', function () {
    maxlengthInput.val('t\r\nt');

    maxlengthInput.maxlength();
    maxlengthInput.focus();

    ok($('.bootstrap-maxlength').html() === '3 / 10', 'Current length is: ' + $('.bootstrap-maxlength').html() + '. Expected 3 / 10.');

  });

});
