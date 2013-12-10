/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('ghost generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('ghost:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        // Extend the timeout since the github release download takes some time
        this.timeout(10000);

        var expected = [
            // add files you expect to exist here.
            'Gruntfile.js',
            'core/ghost.js'
        ];

        helpers.mockPrompt(this.app, {
            'version': '0.3.3'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
