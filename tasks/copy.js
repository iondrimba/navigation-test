var gulp = require('gulp');

module.exports = function () {
	gulp.src(['./src/scripts/app.js'])
		.pipe(gulp.dest('./public/js'));

	gulp.src(['./src/styles/app.css'])
		.pipe(gulp.dest('./public/css'));

};