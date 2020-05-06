$(function () {
  'use strict';

  var maxlengthInput,
    wasCalled,
    argsLength;

  QUnit.module('placement function option', {
    beforeEach: function () {
      wasCalled = false;
      maxlengthInput = $('<input type="text" maxlength="10" />')
        .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({
        placement: function () {
          wasCalled = true;
          argsLength = arguments.length;
        }
      });
    },
    afterEach: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  QUnit.test('Was called', function (assert) {
    maxlengthInput.focus();
    assert.ok(wasCalled, 'Custom placement function was called');
  });
  QUnit.test('Was called with expected number of arguments', function (assert) {
    maxlengthInput.focus();
    assert.ok(argsLength === 3, 'placement function option was called with expected number of arguments');
  });

});
