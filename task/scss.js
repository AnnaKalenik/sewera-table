const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок
const autoprefixer = require("gulp-autoprefixer");  //Автопрефиксер
const csso = require("gulp-csso");  //Сжатие
const rename = require("gulp-rename");
const size = require("gulp-size");  //Для несжатой версии
const shorthand = require("gulp-shorthand");  //Сбор свойств
const groupCssMediaQueries = require("gulp-group-css-media-queries");  //Обьединение медиазапросов
const concat = require("gulp-concat");  //Обьединение CSS
const sass = require('gulp-sass')(require('sass'));  //sass
const webpCss = require("gulp-webp-css")
const {isProd, isDev} = require("../config/app");
const gulpIf = require("gulp-if");


const scss = () => {
    return src(path.scss.src, { sourcemaps: isDev})
        .pipe(plumber(app.plumberSCSS))
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulpIf(app.isProd, webpCss()))
        .pipe(groupCssMediaQueries())
        .pipe(gulpIf(app.isProd, autoprefixer()))
        .pipe(shorthand())
        .pipe(dest(path.scss.dest, { sourcemaps: isDev}))
        .pipe(size({
            title: "style.css"
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(csso())
        .pipe(dest(path.scss.dest, { sourcemaps: true}))
        .pipe(size({
            title: "style.min.css"
        }))
}

module.exports = scss;
