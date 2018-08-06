/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         // Checks to see that the allFeeds variable is defined and has a length of anything greater than 0.
         // This test should pass as allFeeds variab;e is defined in app.js file.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function () { // Ensures URL is defined
            for(let feed of allFeeds) { // Loops through each feed in allFeeds object
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function () { // Ensures name is defined
            for(let feed of allFeeds) { // Loops through each feed in allFeeds object
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            const body = document.querySelector('body'); // Querying body element and storing in variable
            expect(body.classList.contains('menu-hidden')).toBe(true); // Expecting the body element's class list to contain 'menu-hidden'
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles on and off', function() {
            const body = document.querySelector('body'); // Querying body element and storing in a variable
            const menu = document.querySelector('.menu-icon-link'); // Query menu icon element and store in this variable

            menu.click(); // Use click method to simulate the clicking action on the menu icon to make the menu appear
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menu.click(); // Use click method to simulate the clicking action on the menu icon to make the menu hide
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) { // Everything in this function will be run before the 'expect' statement; Let Jasmine test know that beforeEach function is complete and can proceed with the test
            loadFeed(0, done); // Call the loadFeed function for the first index, having the id of 0.
        });

        it('populates entry elements in feed container', function() {
            const feed = document.querySelector('.feed'); // Query feed container
            const entry = document.querySelector('.entry'); // Query entries in feed container
            expect($('.feed .entry').length).toBeTruthy(); // Expecting at least one entry to be displayed

            //const feed = document.querySelector('.feed'); // Query feed container element and store in this variable
            //expect(feed.children.length > 0).toBe(true); // Expecting the feed container's children property to have a length greater than 0 for true
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var prevURL; // variable to hold prevURL
        var newURL; // variable to hold newURL

        beforeEach(function(done) { // Everything in this function will be run before the 'expect' statement; Let Jasmine test know that beforeEach function is complete and can proceed with the test
            loadFeed(0, function() {
                prevURL = document.querySelector('.entry-link');
                // feed 0 done loading
                loadFeed(1, function() {
                    newURL = document.querySelector('.entry-link');
                   // feed 1 done loading
                   // all variables initialized, can begin tests
                    done();
                });
            });
        });
        it('content actually changes', function() {
            // test that content has changed
            expect(prevURL === newURL).toBe(false);
        });
    });
}());
