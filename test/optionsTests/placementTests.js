$(function () {
  'use strict';

  var maxlengthInput;

  module('placement object option', {
    setup: function () {
      maxlengthInput = $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture');

      maxlengthInput.maxlength({
        placement : {
          top: '5px',
          left: '6px',
          bottom: '7px',
          right: '10px'
        }
      });
    },
    teardown: function () {
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();
    }
  });

  test('css top placement from object placement option', function () {
    maxlengthInput.focus();
    var hasTop = $('.bootstrap-maxlength').attr('style').match(/top\:\s?5px/).length === 1;
    ok(hasTop, 'maxlength has expected top style');
  });

  test('css left placement from object placement option', function () {
    maxlengthInput.focus();
    var hasLeft = $('.bootstrap-maxlength').attr('style').match(/left\:\s?6px/).length === 1;
    ok(hasLeft, 'maxlength has expected left style');
  });

  test('css right placement from object placement option', function () {
    maxlengthInput.focus();
    var hasRight = $('.bootstrap-maxlength').attr('style').match(/right\:\s?10px/).length === 1;
    ok(hasRight, 'maxlength has expected right style');
  });

  test('css bottom placement from object placement option', function () {
    maxlengthInput.focus();
    var hasBottom = $('.bootstrap-maxlength').attr('style').match(/bottom\:\s?7px/).length === 1;
    ok(hasBottom, 'maxlength has expected bottom style');
  });


});
