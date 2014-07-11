'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Operations = new Module('operations');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Operations.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Operations.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Operations.menus.add({
        title: 'operations',
        link: 'operations',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Operations.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Operations.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Operations.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Operations;
});
