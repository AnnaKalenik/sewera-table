const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок
const concat = require("gulp-concat");  //Обьединение CSS
const cssImport = require("gulp-cssimport");  //Импорт css CSS
const autoprefixer = require("gulp-autoprefixer");  //Автопрефиксер
const csso = require("gulp-csso");  //Сжатие
const rename = require("gulp-rename");
const size = require("gulp-size");  //Для несжатой версии
const shorthand = require("gulp-shorthand");  //Сбор свойств
const groupCssMediaQueries = require("gulp-group-css-media-queries");  //Обьединение медиазапросов
const webpCss = require("gulp-webp-css") //webp


const css = () => {
    return src(path.css.src, { sourcemaps: true})
        .pipe(plumber(app.plumberCSS))
        // .pipe(concat("main.css"))
        // .pipe(cssImport())
        // .pipe(webpCss())
        // .pipe(groupCssMediaQueries())
        // .pipe(autoprefixer())
        // .pipe(shorthand())
        .pipe(dest(path.css.dest, { sourcemaps: true}))
        // .pipe(size({
        //     title: "main.css"
        // }))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        // .pipe(csso())
        // .pipe(dest(path.css.dest, { sourcemaps: true}))
        // .pipe(size({
        //     title: "main.min.css"
        // }))
}

module.exports = css;
