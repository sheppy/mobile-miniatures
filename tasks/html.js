/*eslint-env node */

var path = require("path");
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var fs = require("fs");
var _ = require("lodash");
var config = require("./config");


var compileHTML = function (){
    return gulp
        .src(path.join(config.dir.jade, config.glob.jade))
        .pipe(plugins.plumber())
        .pipe(plugins.data(function (file) {
            // Extend with global data
            var global, page;
            try {
                global = JSON.parse(fs.readFileSync(path.join(config.dir.data, "global.json")));
                page = JSON.parse(fs.readFileSync(
                    path.join(config.dir.data, path.basename(file.path, ".jade") + ".json")
                ));
            } catch (e) {
                plugins.util.log(plugins.util.colors.red(e.message));
            }
            return _.extend({}, global, page);
        }))
        .pipe(plugins.jade({
            pretty: true
        }))
        .pipe(plugins.plumber.stop());
};


// Save HTML
gulp.task("html", function () {
    return compileHTML()
        .pipe(gulp.dest(config.dir.html));
});
