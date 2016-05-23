/* global describe, before, it */
var path = require('path'),
    testHelpers = require('yeoman-test'),
    assert = require('yeoman-assert');

describe('ghost generator', function () {
    var directory;

    before(function(done) {
        testHelpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (tmpDir) {
                directory = tmpDir;
            })
            .withOptions({version: '0.8.0', casperVersion: '1.3.0'})
            .toPromise().then(function () {
                done();
            });
    });

    it('creates correct package.json', function () {
        var packageJson = path.join(directory, 'package.json');
        // package.json exists and is correct
        assert.file(packageJson);
        assert.jsonFileContent(packageJson, {name: 'ghost', version: '0.8.0'});
    });

    it('correctly downloads casper', function () {
        var casperPackage = path.join(directory, 'content/themes/casper/package.json');

        assert.file(casperPackage);
        assert.jsonFileContent(casperPackage, {name: 'Casper', version: '1.3.0'});
    });
});
