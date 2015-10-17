(function () {

    "use strict";
    var gulp = require('./gulp')(['browserify', 'sass', 'nodemon', 'wiredep', 'mongo', 'ngconstant', 'header']),
        env = process.env.NODE_ENV || 'dev',
        conf = require('./config/config.json'),
        config = conf[env],
        global = conf.global;

    // gulp.task('config', require('./tasks/config/config')(gulp, plugins, global.angular.name, env));
    // gulp.task('header', require('./tasks/header/header')(gulp, plugins));

    gulp.task('default', ['wiredep', 'sass', 'ngconstant']);

    gulp.task('server', ['default', 'nodemon', 'mongo', 'watch-public']);

    // gulp.task('default', ['wiredep', 'sass', 'server', 'mongo', 'config'], function () {
    //     gulp.watch(inputCSS, ['sass']);
    // });

    gulp.task('watch-public', function () {
        gulp.watch(config.sass.inputCss, ['sass']);
    });

    //gulp.task('prod', ['header', 'server']);

}());
