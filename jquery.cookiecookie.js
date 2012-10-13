/**
 * jQuery Cookiecookie v0.9
 * https://github.com/alexandervn/jquery-cookiecookie
 *
 * Copyright Alexander van Noord 2012
 */
(function ($, document) {
    "use strict";

    $.cookiecookie = {

        cookieOptions: {
            expires: 365, // days
            path: '/'
        },

        setCookieOptions: function (cookieOptions, extend) {
            if (extend) {
                this.cookieOptions = $.extend({}, this.cookieOptions, cookieOptions);
            } else {
                this.cookieOptions = cookieOptions;
            }
        },

        getCookieOptions: function () {
            return this.cookieOptions;
        },

        isEmpty: function () {
            return this.get() === null;
        },

        isAllowed: function () {
            if (this.get() === true) {
                return true;
            }
            return false;
        },

        isDeclined: function () {
            return !this.isAllowed();
        },

        allow: function () {
            this.set(true);
            $(document).trigger('cookiecookie.allowed');
        },

        decline: function () {
            this.set(false);
            $(document).trigger('cookiecookie.declined');
        },

        remove: function () {
            this.set(null);
            $(document).trigger('cookiecookie.removed');
        },

        // Private functions
        set: function (setting) {
            // $.cookie() wil cast to string
            $.cookie('ccs', setting, this.cookieOptions);
            $(document).trigger('cookiecookie.set', this.get());
        },

        get: function () {
            var ret;

            if ($.cookie('ccs') === 'true') {
                ret = true;
            } else if ($.cookie('ccs') === 'false') {
                ret = false;
            } else {
                ret = null;
            }

            return ret;
        }

    };

}(jQuery, document));
