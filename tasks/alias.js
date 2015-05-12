/*eslint-env node */

var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("dev", function (callback) {
    runSequence(
        "clean",
        ["html", "css"],
        callback
    );
});

gulp.task("default", ["dev"]);
