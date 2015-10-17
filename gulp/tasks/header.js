var gulp = require('gulp'),
    header = require('gulp-header'),
    pkg = require('../../package.json'),
    fs = require('fs'),
    file = fs.readFileSync('header.txt', 'utf8');

module.exports = function () {
    return function () {
        gulp.src('./public/scripts/**/*.js')
            .pipe(header(file, {
                pkg: pkg
            }))
            .pipe(gulp.dest('./dist/'));
    };
};
