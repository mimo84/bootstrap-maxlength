(function($) {
    "use strict";
    if (!$.event.special.destroyed) {
        $.event.special.destroyed = {
            remove: function(o) {
                if (o.handler) {
                    o.handler();
                }
            }
        };
    }
    $.fn.extend({
        maxlength: function(options, callback) {
            var documentBody = $("body"), defaults = {
                showOnReady: false,
                alwaysShow: true,
                threshold: 0,
                warningClass: "small form-text text-muted",
                limitReachedClass: "small form-text text-danger",
                separator: " / ",
                preText: "",
                postText: "",
                showMaxLength: true,
                placement: "bottom-right-inside",
                message: null,
                showCharsTyped: true,
                validate: false,
                utf8: false,
                appendToParent: false,
                twoCharLinebreak: true,
                customMaxAttribute: null,
                allowOverMax: false,
                zIndex: 1099
            };
            if ($.isFunction(options) && !callback) {
                callback = options;
                options = {};
            }
            options = $.extend(defaults, options);
            function utf8CharByteCount(character) {
                var c = character.charCodeAt();
                return !c ? 0 : c < 128 ? 1 : c < 2048 ? 2 : 3;
            }
            function utf8Length(string) {
                return string.split("").map(utf8CharByteCount).concat(0).reduce((function(sum, val) {
                    return sum + val;
                }));
            }
            function inputLength(input) {
                var text = input.val();
                if (options.twoCharLinebreak) {
                    text = text.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n");
                } else {
                    text = text.replace(/(?:\r\n|\r|\n)/g, "\n");
                }
                var currentLength = 0;
                if (options.utf8) {
                    currentLength = utf8Length(text);
                } else {
                    currentLength = text.length;
                }
                if (input.prop("type") === "file" && input.val() !== "") {
                    currentLength -= 12;
                }
                return currentLength;
            }
            function truncateChars(input, maxlength) {
                var text = input.val();
                if (options.twoCharLinebreak) {
                    text = text.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n");
                    if (text[text.length - 1] === "\n") {
                        maxlength -= text.length % 2;
                    }
                }
                if (options.utf8) {
                    var indexedSize = text.split("").map(utf8CharByteCount);
                    for (var removedBytes = 0, bytesPastMax = utf8Length(text) - maxlength; removedBytes < bytesPastMax; removedBytes += indexedSize.pop()) ;
                    maxlength -= maxlength - indexedSize.length;
                }
                input.val(text.substr(0, maxlength));
            }
            function charsLeftThreshold(input, threshold, maxlength) {
                var output = true;
                if (!options.alwaysShow && maxlength - inputLength(input) > threshold) {
                    output = false;
                }
                return output;
            }
            function remainingChars(input, maxlength) {
                var length = maxlength - inputLength(input);
                return length;
            }
            function showRemaining(currentInput, indicator) {
                indicator.css({
                    display: "block"
                });
                currentInput.trigger("maxlength.shown");
            }
            function hideRemaining(currentInput, indicator) {
                if (options.alwaysShow) {
                    return;
                }
                indicator.css({
                    display: "none"
                });
                currentInput.trigger("maxlength.hidden");
            }
            function updateMaxLengthHTML(currentInputText, maxLengthThisInput, typedChars) {
                var output = "";
                if (options.message) {
                    if (typeof options.message === "function") {
                        output = options.message(currentInputText, maxLengthThisInput);
                    } else {
                        output = options.message.replace("%charsTyped%", typedChars).replace("%charsRemaining%", maxLengthThisInput - typedChars).replace("%charsTotal%", maxLengthThisInput);
                    }
                } else {
                    if (options.preText) {
                        output += options.preText;
                    }
                    if (!options.showCharsTyped) {
                        output += maxLengthThisInput - typedChars;
                    } else {
                        output += typedChars;
                    }
                    if (options.showMaxLength) {
                        output += options.separator + maxLengthThisInput;
                    }
                    if (options.postText) {
                        output += options.postText;
                    }
                }
                return output;
            }
            function manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator) {
                if (maxLengthIndicator) {
                    maxLengthIndicator.html(updateMaxLengthHTML(currentInput.val(), maxLengthCurrentInput, maxLengthCurrentInput - remaining));
                    if (remaining > 0) {
                        if (charsLeftThreshold(currentInput, options.threshold, maxLengthCurrentInput)) {
                            showRemaining(currentInput, maxLengthIndicator.removeClass(options.limitReachedClass).addClass(options.warningClass));
                        } else {
                            hideRemaining(currentInput, maxLengthIndicator);
                        }
                    } else {
                        showRemaining(currentInput, maxLengthIndicator.removeClass(options.warningClass).addClass(options.limitReachedClass));
                    }
                }
                if (options.customMaxAttribute) {
                    if (remaining < 0) {
                        currentInput.addClass("overmax");
                    } else {
                        currentInput.removeClass("overmax");
                    }
                }
            }
            function getPosition(currentInput) {
                var el = currentInput[0];
                return $.extend({}, typeof el.getBoundingClientRect === "function" ? el.getBoundingClientRect() : {
                    width: el.offsetWidth,
                    height: el.offsetHeight
                }, currentInput.offset());
            }
            function placeWithCSS(placement, maxLengthIndicator) {
                if (!placement || !maxLengthIndicator) {
                    return;
                }
                var POSITION_KEYS = [ "top", "bottom", "left", "right", "position" ];
                var cssPos = {};
                $.each(POSITION_KEYS, (function(i, key) {
                    var val = options.placement[key];
                    if (typeof val !== "undefined") {
                        cssPos[key] = val;
                    }
                }));
                maxLengthIndicator.css(cssPos);
                return;
            }
            function place(currentInput, maxLengthIndicator) {
                var pos = getPosition(currentInput);
                if ($.type(options.placement) === "function") {
                    options.placement(currentInput, maxLengthIndicator, pos);
                    return;
                }
                if ($.isPlainObject(options.placement)) {
                    placeWithCSS(options.placement, maxLengthIndicator);
                    return;
                }
                var inputOuter = currentInput.outerWidth(), outerWidth = maxLengthIndicator.outerWidth(), actualWidth = maxLengthIndicator.width(), actualHeight = maxLengthIndicator.height();
                if (options.appendToParent) {
                    pos.top -= currentInput.parent().offset().top;
                    pos.left -= currentInput.parent().offset().left;
                }
                switch (options.placement) {
                  case "bottom":
                    maxLengthIndicator.css({
                        top: pos.top + pos.height,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    });
                    break;

                  case "top":
                    maxLengthIndicator.css({
                        top: pos.top - actualHeight,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    });
                    break;

                  case "left":
                    maxLengthIndicator.css({
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left - actualWidth
                    });
                    break;

                  case "right":
                    maxLengthIndicator.css({
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    });
                    break;

                  case "bottom-right":
                    maxLengthIndicator.css({
                        top: pos.top + pos.height,
                        left: pos.left + pos.width
                    });
                    break;

                  case "top-right":
                    maxLengthIndicator.css({
                        top: pos.top - actualHeight,
                        left: pos.left + inputOuter
                    });
                    break;

                  case "top-left":
                    maxLengthIndicator.css({
                        top: pos.top - actualHeight,
                        left: pos.left - outerWidth
                    });
                    break;

                  case "bottom-left":
                    maxLengthIndicator.css({
                        top: pos.top + currentInput.outerHeight(),
                        left: pos.left - outerWidth
                    });
                    break;

                  case "centered-right":
                    maxLengthIndicator.css({
                        top: pos.top + actualHeight / 2,
                        left: pos.left + inputOuter - outerWidth - 3
                    });
                    break;

                  case "bottom-right-inside":
                    maxLengthIndicator.css({
                        top: pos.top + pos.height,
                        left: pos.left + pos.width - outerWidth
                    });
                    break;

                  case "top-right-inside":
                    maxLengthIndicator.css({
                        top: pos.top - actualHeight,
                        left: pos.left + inputOuter - outerWidth
                    });
                    break;

                  case "top-left-inside":
                    maxLengthIndicator.css({
                        top: pos.top - actualHeight,
                        left: pos.left
                    });
                    break;

                  case "bottom-left-inside":
                    maxLengthIndicator.css({
                        top: pos.top + currentInput.outerHeight(),
                        left: pos.left
                    });
                    break;
                }
            }
            function isPlacementMutable() {
                return options.placement === "bottom-right-inside" || options.placement === "top-right-inside" || typeof options.placement === "function" || options.message && typeof options.message === "function";
            }
            function getMaxLength(currentInput) {
                var max = currentInput.attr("maxlength") || options.customMaxAttribute;
                if (options.customMaxAttribute && !options.allowOverMax) {
                    var custom = currentInput.attr(options.customMaxAttribute);
                    if (!max || custom < max) {
                        max = custom;
                    }
                }
                if (!max) {
                    max = currentInput.attr("size");
                }
                return max;
            }
            return this.each((function() {
                var currentInput = $(this), maxLengthCurrentInput, maxLengthIndicator;
                $(window).resize((function() {
                    if (maxLengthIndicator) {
                        place(currentInput, maxLengthIndicator);
                    }
                }));
                function firstInit() {
                    var maxlengthContent = updateMaxLengthHTML(currentInput.val(), maxLengthCurrentInput, "0");
                    maxLengthCurrentInput = getMaxLength(currentInput);
                    if (!maxLengthIndicator) {
                        maxLengthIndicator = $('<span class="bootstrap-maxlength"></span>').css({
                            display: "none",
                            position: "absolute",
                            whiteSpace: "nowrap",
                            zIndex: options.zIndex
                        }).html(maxlengthContent);
                    }
                    if (currentInput.is("textarea")) {
                        currentInput.data("maxlenghtsizex", currentInput.outerWidth());
                        currentInput.data("maxlenghtsizey", currentInput.outerHeight());
                        currentInput.mouseup((function() {
                            if (currentInput.outerWidth() !== currentInput.data("maxlenghtsizex") || currentInput.outerHeight() !== currentInput.data("maxlenghtsizey")) {
                                place(currentInput, maxLengthIndicator);
                            }
                            currentInput.data("maxlenghtsizex", currentInput.outerWidth());
                            currentInput.data("maxlenghtsizey", currentInput.outerHeight());
                        }));
                    }
                    if (options.appendToParent) {
                        currentInput.parent().append(maxLengthIndicator);
                        currentInput.parent().css("position", "relative");
                    } else {
                        documentBody.append(maxLengthIndicator);
                    }
                    var remaining = remainingChars(currentInput, getMaxLength(currentInput));
                    manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator);
                    place(currentInput, maxLengthIndicator);
                }
                if (options.showOnReady) {
                    currentInput.ready((function() {
                        firstInit();
                    }));
                } else {
                    currentInput.focus((function() {
                        firstInit();
                    }));
                }
                currentInput.on("maxlength.reposition", (function() {
                    place(currentInput, maxLengthIndicator);
                }));
                currentInput.on("destroyed", (function() {
                    if (maxLengthIndicator) {
                        maxLengthIndicator.remove();
                    }
                }));
                currentInput.on("blur", (function() {
                    if (maxLengthIndicator && !options.showOnReady) {
                        maxLengthIndicator.remove();
                    }
                }));
                currentInput.on("input", (function() {
                    var maxlength = getMaxLength(currentInput), remaining = remainingChars(currentInput, maxlength), output = true;
                    if (options.validate && remaining < 0) {
                        truncateChars(currentInput, maxlength);
                        output = false;
                    } else {
                        manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator);
                    }
                    if (isPlacementMutable()) {
                        place(currentInput, maxLengthIndicator);
                    }
                    return output;
                }));
            }));
        }
    });
})(jQuery);