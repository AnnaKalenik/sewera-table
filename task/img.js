const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок
const imageMin = require("gulp-imagemin");  //Сжатие изображений
const newer = require("gulp-newer");  //Убираем сжатие уже добавленных изображений
const webp = require("gulp-webp");  // Webp
const gulpIf = require("gulp-if");
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

const img = () => {
    return src(path.img.src)
        .pipe(plumber(app.plumberIMG))
        .pipe(newer(path.img.dest))
        .pipe(webp())
        .pipe(dest(path.img.dest))
        .pipe(src(path.img.src))
        .pipe(newer(path.img.dest))
        .pipe(imageMin(app.imageMin))
        .pipe(dest(path.img.dest))
}

module.exports = img;
