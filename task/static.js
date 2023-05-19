const {src, dest} = require("gulp");
const path = require("../config/path");
const app = require("../config/app");

//Плагины
const plumber = require("gulp-plumber");  //Отображение ошибок


const static = () => {
    return src(path.static.src)
        .pipe(plumber(app.plumberSTATIC))
        .pipe(dest(path.static.dest))
}

module.exports = static;
