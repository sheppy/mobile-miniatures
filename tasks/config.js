/*eslint-env node */

module.exports = {
    glob: {
        html: "**/*.html",
        jade: "**/*.jade",
        css: "**/*.css",
        scss: "**/*.scss",
        json: "**/*.json"
    },
    dir: {
        src: "./src",
        dist: "./public",
        scss: "./src/assets/scss",
        css: "./public/assets/css",
        jade: "./src/templates/pages",
        html: "./public",
        data: "./src/data",
        assets: "./public/assets"
    },
    file: {
        normalize: "./bower_components/normalize.css/normalize.css"
    },

    browsers: ["last 2 versions"]
};
