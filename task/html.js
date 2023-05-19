const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок
const fileInclude = require('gulp-file-include');
const size = require('gulp-size');
const htmlMin = require('gulp-htmlmin');
const {errors} = require("browser-sync/dist/config");
const webpHtml = require("gulp-webp-html")
const gulpIf = require("gulp-if");


const html = () => {
    return src(path.html.src)
        .pipe(plumber(app.plumberHTML))
        .pipe(fileInclude())
        .pipe(gulpIf(app.isProd, webpHtml()))
        // .pipe(gulpIf(app.isProd, size({
        //     title: "До сжатия"
        // })))
        // .pipe(gulpIf(app.isProd, htmlMin(app.htmlMin)))
        // .pipe(gulpIf(app.isProd, size({
        //     title: "После сжатия"
        // })))
        .pipe(dest(path.html.dest))
}

module.exports = html;
