$(function () {
    'use strict';
    module('maxlength');

    test('Maxlength is displayed correctly', function () {
      $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture')
          .maxlength().focus();

      ok($('.bootstrap-maxlength').length, 'maxlength was inserted');

      $('.bootstrap-maxlength').remove();

      $('#qunit-fixture').empty();
    });

    test('Maxlength is visible on focus', function () {
      $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture')
          .maxlength().end().focus();

      ok($('.bootstrap-maxlength').is(':visible'), 'Maxlength is visible');

      $('.bootstrap-maxlength').remove();

      $('#qunit-fixture').empty();
    });

    test('Maxlength is invisible on blur', function () {
      var maxlengthInput = $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture')
          .maxlength();

          maxlengthInput.focus();
          maxlengthInput.blur();
          ok( !$('.bootstrap-maxlength').length, 'Maxlength is not visible');
          $('.bootstrap-maxlength').remove();
          $('#qunit-fixture').empty();
    });

    test('Maxlength updates the maxlength', function () {

      var maxlengthInput = $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();
      maxlengthInput.focus();

      // Change the maxlength attribute
      maxlengthInput.blur();
      maxlengthInput.attr('maxlength','142');

      maxlengthInput.focus();

      ok($('.bootstrap-maxlength').html() === '0 / 142' , 'Maxlength updated the field');
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();

    });

    test('The focus event is triggered multiple times without a blur', function () {

      var maxlengthInput = $('<input type="text" maxlength="10" />')
          .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();

      maxlengthInput.focus();
      maxlengthInput.focus();
      maxlengthInput.focus();
      maxlengthInput.focus();

      ok($('.bootstrap-maxlength').length === 1, 'Maxlength visualized only once after multiple focuses');
      $('.bootstrap-maxlength').remove();
      $('#qunit-fixture').empty();

    });

    test('Newlines are not counted twice', function() {
      var maxlengthInput = $('<textarea maxlength="10"></textarea>').val('t\r\nt')
          .appendTo('#qunit-fixture');

      maxlengthInput.maxlength();
      maxlengthInput.focus();

      ok($('.bootstrap-maxlength').html() === '3 / 10' , 'Current length is: '+$('.bootstrap-maxlength').html()+'. Expected 3 / 10.');

    });

});