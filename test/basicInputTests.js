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

  test('The default threshold is respected', function () {
    var content = 'Bootstrap';
    ok(content.length < 10, 'Initial content should be less of 10 letters');
    maxlengthInput.val(content);
    maxlengthInput.focus();

    ok($('.bootstrap-maxlength.label.label-success').length === 1, 'Maxlength badge has the success label');
    ok($('.bootstrap-maxlength.label.label-danger').length === 0, 'Maxlength badge do not have the danger label');

    var newContent = 'Bootstrap ';
    ok(newContent.length === 10, 'newContent should be of 10 letters');
    maxlengthInput.val(newContent);
    maxlengthInput.focus();
    ok($('.bootstrap-maxlength.label.label-danger').length === 1, 'Maxlength badge has the danger label');
    ok($('.bootstrap-maxlength.label.label-success').length === 0, 'Maxlength badge do not have the success label');
  });

});
