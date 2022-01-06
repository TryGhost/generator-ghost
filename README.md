# generator-ghost [![Build Status](https://secure.travis-ci.org/sethvincent/generator-ghost.png?branch=master)](https://travis-ci.org/sethvincent/generator-ghost)

A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

Additionally, tnstall the grunt-cli tool:

```
npm install -g grunt-cli
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-ghost from npm, run:

```
$ npm install -g generator-ghost
```

Finally, initiate the generator:

```
$ yo ghost
```

Now, you can run your ghost blog in development like usual:

```
npm start
```

To create a new theme based on Casper, run this subgenerator:

```
yo ghost:theme-copy-casper NAME-OF-NEW-THEME
```

That will copy the Casper theme over to a new folder named NAME-OF-NEW-THEME.


## Todo

I'd like to have a theme generator that starts a new theme that's even more bare-bones than Casper.

## Feedback
Let me know in the repository issue queue if you find any bugs or have ideas for the project: [github.com/sethvincent/generator-ghost/issues](https://github.com/sethvincent/generator-ghost/issues)


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


# Copyright & License

Copyright (c) 2013-2022 Seth Vincent & Ghost Foundation - Released under the [MIT license](LICENSE).
