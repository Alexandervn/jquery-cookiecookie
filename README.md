jQuery Cookiecookie
===================

Plugin that helps you to create notices to comply with the cookie law, in the EU or the Netherlands.

Contrary to similar plugins, this plugin does not add or change any HTML or CSS. This is just a tool to save the user's preference to allow or decline cookies. You need (and probably want) to make the notice yourself, in the style of the website.

Installation
--

You need jQuery and the jQuery.cookie plugin:

    <script src="jquery.js"></script>
    <script src="jquery.cookie.js"></script>
    <script src="jquery.cookiecookie.js"></script>

Usage
-----

You can effectuate the user's preference for allowing or declining cookies as follows:

    $.cookiecookie.allow();
    $.cookiecookie.decline();

Maybe used like this, that is up to you:

    $('.cookie-notice-allow').click(function(e) {
        e.preventDefault();
        $.cookiecookie.allow();
    }

All external Javascript should then be conditionally loaded:

    if ($.cookiecookie.isAllowed()) {
        // ...
    }

It might be neccessary to reload the page after allowing cookies..

    $.cookiecookie.allow();
    $.reload();

..but the plugin also fires off events (on `document`) where you can hook into:

    $(document).on('cookiecookie.allowed', function () {
        // ...
    });

Of course, being a cookie, this value can also be read from the server-side. The value is a boolean string.

Testing
-------

The unit tests (with QUnit) are included. You can run them in your browser. But note that cookies don't work on 'localhost'.

License?
--------

This software is released to the public domain: [CC0](http://creativecommons.org/publicdomain/zero/1.0/ "CC0 1.0 Universal").
