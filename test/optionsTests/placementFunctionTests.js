$(function () {
  'use strict';

  var maxlengthInput,
      wasCalled,
      argsLength;

  module('placement function option', {
    setup: function () {
      wasCalled = false;
      maxlengthInput = $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({
        placement : function () {
          wasCalled = true;
          argsLength = arguments.length;
        }
      });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('Was called', function () {
    maxlengthInput.focus();
    ok(wasCalled, 'Custom placement function was called');
  });
  test('Was called with expected number of arguments', function () {
    maxlengthInput.focus();
    ok(argsLength === 3, 'placement function option was called with expected number of arguments');
  });

});
