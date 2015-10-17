var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	env = process.env.NODE_ENV || 'dev',
	config = require('../../config/config.json')[env],
	sassOptions = {
		errLogToConsole: true,
		outputStyle: 'expanded'
	};

module.exports = function() {
	return gulp.src(config.sass.inputCss)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(config.sass.outputCss));
};
