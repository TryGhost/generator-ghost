'use strict';

var path = require('path');
var generators = require('yeoman-generator');
var slugify = require('slugify');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('name', {
            type: String,
            required: true,
            desc: 'Give your new theme a name!'
        });

        this.newThemePath = path.join(process.cwd(), slugify(this.name.toLowerCase()));
    },

    writing: function () {
        this.fs.copy(this.templatePath(), this.newThemePath);
    },

    end: function () {
        this.log('Successfully generated a new theme \'' + this.name + '\'!');
    }
});
