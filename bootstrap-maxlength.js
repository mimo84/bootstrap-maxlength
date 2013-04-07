/* ==========================================================
 * bootstrap-maxlength.js v1.1
 * ==========================================================
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


;(function($) {
    $.fn.extend({
        maxlength: function(options,callback) {

            var documentBody = $('body');

            var defaults = {
                alwaysShow: false, // if true the indicator it's always shown.
                threshold: 10, // Represents how many chars left are needed
                warningClass: "badge badge-info",
                limitReachedClass: "badge badge-warning",
								separator: ' / ',
								preText: '',
								postText: ''
            };

            if($.isFunction(options) && !callback) {
                callback = options;
                options = {};
            }

            options = $.extend(defaults, options);

            /**
             * Return true if the indicator should be showing up.
             *
             * @param input
             * @param thereshold
             * @param maxlength
             * @return {number}
             */
            function charsLeftThreshold(input, thereshold, maxlength) {

                if ( options.alwaysShow ) {
                    return true
                } else {
                    if ( (maxlength - inputLength(input) ) <= thereshold) {
                        return true
                    } else {
                        return false
                    }
                }
            };

            /**
             * Return the length of the specified input.
             *
             * @param input
             * @return {number}
             */
            function inputLength(input) {
                return input.val().length
            };

            /**
             * Returns how many chars are left to complete the fill up of the form.
             *
             * @param input
             * @param maxlength
             * @return {number}
             */
            function remainingChars(input, maxlength) {
                return maxlength - inputLength(input)
            };
            /**
             * When called displays the indicator.
             *
             * @param indicator
             */
            function showRemaining(indicator) {
                indicator.css({
                    display: 'block'
                });
            };
            /**
             * When called shows the indicator.
             *
             * @param indicator
             */
            function hideRemaining(indicator) {
                indicator.css({
                    display: 'none'
                });
            };
            /**
             * This function updates the value of the counter in the indicator.
             * Wants as parameters: the number of remaining chars, the element currently managed,
             * the maxLength for the current input and the indicator generated for it.
             *
             * @param remaining
             * @param currentInput
             * @param maxLengthCurrentInput
             * @param maxLengthIndicator
             */
            function manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator) {

                maxLengthIndicator.html(updateMaxLengthHTML(maxLengthCurrentInput,remaining));

                if ( remaining ) {
                    if(charsLeftThreshold(currentInput, options.threshold, maxLengthCurrentInput)) {
                        showRemaining(maxLengthIndicator.removeClass(options.limitReachedClass).addClass(options.warningClass))
                    } else {
                        hideRemaining(maxLengthIndicator)
                    }
                } else {
                    showRemaining(maxLengthIndicator.removeClass(options.warningClass).addClass(options.limitReachedClass))
                }
            }
						/**
						 * This function updates the value in the indicator
						 *  
						 * @param maxlengthIndicator
						 * @return String
						 */
						function updateMaxLengthHTML(maxLengthThisInput, typedChars) {
							var output = '';
							if(options.preText) {
								output += options.preText;
							} 
							output = output + typedChars + options.separator + maxLengthThisInput;
							if(options.postText) {
								output += options.postText;
							} 
							return output
						}



            return this.each(function(){

                var currentInput = $(this),
                    maxLengthCurrentInput = currentInput.attr('maxlength') || currentInput.attr('size'),
                    maxLengthIndicator = $('<span></span>').css({
                                                display:'none',
                                                position:'absolute',
                                                whiteSpace:'nowrap',
                                                zIndex: 999
                                            }).html(updateMaxLengthHTML(maxLengthCurrentInput,'0'))

                documentBody.append(maxLengthIndicator)
                
                currentInput.focus(function() {
                    var currentInputTopPx = currentInput.offset().top + currentInput.outerHeight(),
                        currentInputLeftPx = currentInput.offset().left + currentInput.outerWidth(),
                        remaining = remainingChars(currentInput, maxLengthCurrentInput);

                    maxLengthIndicator.css({
                        top: currentInputTopPx + 'px',
                        left: currentInputLeftPx + 'px',
                        zIndex: 999999999
                    });

                    manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator)

                });

                currentInput.blur(function(){
                    maxLengthIndicator.css('display','none');
                });

               currentInput.keyup(function(){
                   var remaining = remainingChars(currentInput, maxLengthCurrentInput);
                   manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator)
               });
            });
        }
    });
})(jQuery);