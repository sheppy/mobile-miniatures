/*eslint-env node */

var path = require("path");
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var streamQueue = require("streamqueue");
var browserSync = require("browser-sync");
var config = require("./config");


// Compile CSS
gulp.task("css", function () {
    var stream = streamQueue({ objectMode: true });
    stream.queue(gulp.src(config.file.normalize));
    stream.queue(
        gulp
            .src(path.join(config.dir.scss, config.glob.scss))
            .pipe(plugins.plumber())
            .pipe(plugins.sass())
            .pipe(plugins.plumber.stop())
    );

    return stream.done()
        .pipe(plugins.plumber())
        .pipe(plugins.concat("main.css"))
        .pipe(plugins.autoprefixer({
            browsers: config.browsers,
            cascade: false
        }))
        .pipe(plugins.csscomb())
        .pipe(plugins.combineMq({ beautify: false }))
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(plugins.csso())
        .pipe(plugins.cssbeautify({ autosemicolon: true }))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(config.dir.css))
        .pipe(browserSync.reload({ stream: true }));
});
