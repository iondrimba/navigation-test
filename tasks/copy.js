var gulp = require('gulp');

module.exports = function () {
	return gulp.src('./src/templates/index.html')
		.pipe(gulp.dest('./public'));
};