var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	env = process.env.NODE_ENV || 'dev',
	config = require('../../config/config')[env];

module.exports = function() {
	return browserify(config.js.inputJs + 'app.js').bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.js.outputJs));
};
