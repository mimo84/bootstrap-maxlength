$(function () {
  'use strict';

  var maxlengthInput;

  QUnit.module('maxlength', {
    beforeEach: function () {
      maxlengthInput = $('<input type="text" maxlength="10" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('Maxlength is displayed correctly', function (assert) {
    console.log($, maxlengthInput);
    maxlengthInput.focus();
    assert.ok($('.bootstrap-maxlength').length, 'maxlength was inserted');
  });

  QUnit.test('Maxlength is visible on focus', function (assert) {
    maxlengthInput.focus();
    assert.ok($('.bootstrap-maxlength').is(':visible'), 'Maxlength is visible');
  });

  QUnit.test('Maxlength is removed on blur', function (assert) {
    maxlengthInput.maxlength().focus().blur();
    assert.ok(!$('.bootstrap-maxlength').length, 'Maxlength is removed on blur');
  });

  QUnit.test('Maxlength updates the maxlength', function (assert) {
    maxlengthInput.focus();

    // Change the maxlength attribute
    maxlengthInput.blur().attr('maxlength', '142').focus();

    assert.ok($('.bootstrap-maxlength').html() === '0 / 142', 'Maxlength updated the field');

  });

  QUnit.test('Removing an element with the maxlength removes the maxlength if any.', function (assert) {
    maxlengthInput.maxlength().focus();
    maxlengthInput.remove();
    assert.ok($('.bootstrap-maxlength').length === 0, 'Maxlength field removed with the input');

  });

  QUnit.test('The focus event is triggered multiple times without a blur', function (assert) {
    maxlengthInput.focus().focus().focus().focus();
    assert.ok($('.bootstrap-maxlength').length === 1, 'Maxlength visualized only once after multiple focuses');
  });

  // QUnit.test('The default threshold is respected', function (assert) {
  //   var content = 'Bootstrap';
  //   maxlengthInput.maxlength();
  //   assert.ok(content.length < 10, 'Initial content should be less of 10 letters');
  //   maxlengthInput.focus();
  //   maxlengthInput.val(content);
  //   console.log(maxlengthInput);


  //   assert.ok($('.bootstrap-maxlength.label.label-success').length === 1, 'Maxlength badge has the success label');
  //   assert.ok($('.bootstrap-maxlength.label.label-danger').length === 0, 'Maxlength badge do not have the danger label');

  //   var newContent = 'Bootstrap ';
  //   assert.ok(newContent.length === 10, 'newContent should be of 10 letters');
  //   maxlengthInput.val(newContent);
  //   maxlengthInput.focus();
  //   assert.ok($('.bootstrap-maxlength.label.label-danger').length === 1, 'Maxlength badge has the danger label');
  //   assert.ok($('.bootstrap-maxlength.label.label-success').length === 0, 'Maxlength badge do not have the success label');
  // });

});
