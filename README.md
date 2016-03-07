# ES6 Starter Project
Ready to go ES6 project for SPA template.

[![Travis build status](https://travis-ci.org/iondrimba/ES6StarterProject.svg?branch=master)](https://travis-ci.org/iondrimba/ES6StarterProject) [![Coverage Status](https://coveralls.io/repos/github/iondrimba/ES6StarterProject/badge.svg?branch=master)](https://coveralls.io/github/iondrimba/ES6StarterProject?branch=master)

### Installation

```sh
$ git clone https://github.com/iondrimba/ES6StarterProject.git
$ cd ES6StarterProject
$ npm install

$ gulp
```
[Live demo]

__TODO:__
 * Write more tests

__Features:__
 * Router system with pushstate (page.js)
 * Templating engine (handlebars.js)
 * Module system CommonJs (browserify)

> In order to test if Pushstate is working
> you have to host it on apache so it can reads the .htaccess file

__Testing:__
 * $ npm test

__Includes:__
  * BrowserSync
  * Browserify 
  * Karma (test runner)
  * Jasmine (test library)
  * Sass
  * ESLint
  * Scss Lint (Requires Ruby and [scss-lint])
  * Imagemin (images optimization)
  * Uglify
  * Watch
  * Html-Min
  * Post-Css (autoprefixer)

__Gulp Tasks:__

 * gulp (default)
 * gulp deploy
 * gulp travis

__Structure:__

````bash
├── public/
│    ├─── js/  (.gitignored)
│    ├─── css/  (.gitignored)
│    ├─── images/
│    ├─── .htaccess
│    └─── index.html
│── spec/(jasmine tests)
│── src/
│    ├── scripts/
│    └── scss/
│    └── templates/
│── tasks/
│── test/(coverage report)
│
│── .gitignore
│── .travis.yml
│── karma.conf.js
│── gulpfile.js
│── lint.yml
│── package.json
└── README.md
````

[scss-lint]:<https://github.com/brigade/scss-lint#installation>
[Live demo]:<http://iondrimba.github.io/SPATemplate/>
