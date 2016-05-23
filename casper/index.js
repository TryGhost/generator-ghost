'use strict';

var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('name', {
            type: String,
            required: true,
            desc: 'Give your new theme a name!'
        });
    },

    writing: function () {
        var casperPath = path.join(process.cwd(), 'content', 'themes', 'casper');
        var newThemePath = path.join(process.cwd(), 'content', 'themes', this.name);

        this.fs.copy(casperPath, newThemePath);
    },

    end: function () {
        this.log('Successfully generated a new theme \'' + this.name + '\'!');
    }
});
