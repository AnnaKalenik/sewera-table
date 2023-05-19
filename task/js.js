const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок
const babel = require("gulp-babel");  //
const uglify = require("gulp-uglify");  //Сжатие
const webpack = require("webpack-stream");  //Webpack

const js = () => {
    return src(path.js.src, { sourcemaps: true})
        .pipe(plumber(app.plumberJS))
        // .pipe(babel())
        // .pipe(uglify())
        // .pipe(webpack(app.webpack))
        .pipe(dest(path.js.dest, { sourcemaps: true}))
}

module.exports = js;
