var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function() {
    browserSync.init({
        server: "./public",
        //proxy: "spa:3000"
    });

    gulp.watch("./public/css/app.css").on('change', browserSync.reload);
    gulp.watch("./public/js/app.js").on('change', browserSync.reload);
};