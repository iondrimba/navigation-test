'use strict';
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);


//copies index.html file to public folder
gulp.task('copy', require('./tasks/copy.js'));

// using vinyl-source-stream:
gulp.task('browserify', require('./tasks/browserify.js'));

//eslint task
gulp.task('eslint', require('./tasks/eslint.js'));

//sass - scss task
gulp.task('sass', require('./tasks/sass.js'));

//watch js/scss/teplate files
gulp.task('watch', require('./tasks/watch.js'));

//local server
gulp.task('browser-sync', require('./tasks/browser-sync.js'));


// Default Task
gulp.task('default', gulpsync.sync(['copy', 'sass', 'eslint', 'browserify', 'browser-sync', 'watch']));

//publish Task
gulp.task('deploy', gulpsync.sync(['copy', 'sass', 'eslint', 'browserify']));