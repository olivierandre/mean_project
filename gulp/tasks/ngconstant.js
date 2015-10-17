var gulp = require('gulp'),
    ngConstant = require('gulp-ng-constant'),
    data = require('../../config/constant.json'),
    env = process.env.NODE_ENV || 'dev',
	global = require('../../config/config').global;

//TODO : A Corriger
module.exports = function () {
    return ngConstant({
            name: global.angular.name,
            constants: data[env],
            stream: true
        })
        .pipe(gulp.dest('./public/scripts/config'));
};
