(function($, document) {

    // Test does not work on localhost
    // Remove all cookies before testing
    test("cookiecookie tests", function() {

        var defaultCookieOptions,
            newCookieOptions;

        expect(15);

        // Asssert options
        defaultCookieOptions = {
            expires: 365, // days
            path: '/'
        };

        deepEqual($.cookiecookie.getCookieOptions(), defaultCookieOptions, 'Default cookie options are as expected');

        newCookieOptions = {
            expires: 1,
            json: true
        };

        $.cookiecookie.setCookieOptions(newCookieOptions, true);

        deepEqual($.cookiecookie.getCookieOptions(), $.extend({}, defaultCookieOptions, newCookieOptions), 'Cookie options with added/changed values are as expected');

        // Back to default options
        $.cookiecookie.setCookieOptions(defaultCookieOptions);

        deepEqual($.cookiecookie.getCookieOptions(), defaultCookieOptions, 'Default cookie options are set again');

        // Set: called three times, for remove, allow en decline
        $(document).bind('cookiecookie.set', function(e, setting) {
            equal(setting, $.cookiecookie.get(), 'Run cookiecookie.set event when setting is changed');
        });

        // 1. Remove
        $(document).bind('cookiecookie.removed', function() {
            strictEqual($.cookiecookie.get(), null, 'Run cookiecookie.removed event when removed');
        });
        $.cookiecookie.remove();
        strictEqual($.cookiecookie.isEmpty(), true, 'Cookie setting is now empty');
        strictEqual($.cookie('ccs'), null, "Saved cookie should now be null");

        // 2. Allow
        $(document).bind('cookiecookie.allowed', function() {
            strictEqual($.cookiecookie.isAllowed(), true, 'Run cookiecookie.allowed event when allowed');
        });
        $.cookiecookie.allow();
        strictEqual($.cookiecookie.isAllowed(), true, 'Cookie setting is now allowed');
        strictEqual($.cookie('ccs'), 'true', "Saved cookie should now be 'true'");

        // 3. Decline
        $(document).bind('cookiecookie.declined', function() {
            strictEqual($.cookiecookie.isDeclined(), true, 'Run cookiecookie.declined event when declined');
        });
        $.cookiecookie.decline();
        strictEqual($.cookiecookie.isDeclined(), true, 'Cookie setting is now declined');
        strictEqual($.cookie('ccs'), 'false', "Saved cookie should now be 'false'");

    });
}(jQuery, document));
