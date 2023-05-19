const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок
const fonter = require("gulp-fonter");  //Отображение ошибок
const ttf2woff2 = require("gulp-ttf2woff2") //gulp-ttf2woff2
const gulpIf = require("gulp-if");

const font = () => {
    return src(path.font.src)
        .pipe(plumber(app.plumberFONT))
        .pipe(gulpIf(app.isProd, fonter(app.fonter)))
        .pipe(dest(path.font.dest))
        .pipe(gulpIf(app.isProd, ttf2woff2()))
        .pipe(gulpIf(app.isProd, dest(path.font.dest)))
}

module.exports = font;
