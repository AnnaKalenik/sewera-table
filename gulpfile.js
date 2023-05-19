const {watch, series, parallel} = require("gulp");
const path = require("./config/path")
const app = require("./config/app")

//Плагины
const browserSync = require("browser-sync").create();
const clear = require("./task/clear")
const html = require("./task/html")
const scss = require("./task/scss")
const css = require("./task/css")
const js = require("./task/js")
const img = require("./task/img")
const static = require("./task/static")
const font = require("./task/font")
const {isProd} = require("./config/app");


//Сервер
const server = ()=>{
    browserSync.init({
        server:{
            baseDir: path.root,
        }
    })
}

//Наблюдение
const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);
    watch(path.img.watch, img).on("all", browserSync.reload);
    watch(path.font.watch, font).on("all", browserSync.reload);
    watch(path.css.watch, css).on("all", browserSync.reload);
    watch(path.static.watch, static).on("all", browserSync.reload);
}

exports.html = html;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.img = img;
exports.font = font;
exports.static = static;
exports.watch = watcher;
exports.clear = clear;

//Сборка
const build = series(
    clear,
    parallel(html, scss, css, js, img, font, static)
)

const dev = series(
    build,
    parallel(watcher, server),
)

exports.default = app.isProd ? build : dev
