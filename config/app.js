const notify = require("gulp-notify"); // Сообщения об ошибках
const {error} = require("browser-sync/dist/config");
const imageminPngquant = require("imagemin-pngquant");
const isProd = process.argv.includes("--production");
const isDev = !isProd;

module.exports = {
    isProd: isProd,
    isDev: isDev,

    plumberHTML: {
        errorHandler: notify.onError(error => ({
            title: "HTML",
            message: error.message
        }))
    },
    plumberCSS: {
        errorHandler: notify.onError(error => ({
            title: "CSS",
            message: error.message
        }))
    },
    plumberSCSS: {
        errorHandler: notify.onError(error => ({
            title: "SCSS",
            message: error.message
        }))
    },
    plumberJS: {
        errorHandler: notify.onError(error => ({
            title: "JS",
            message: error.message
        }))
    },
    plumberIMG: {
        errorHandler: notify.onError(error => ({
            title: "IMG",
            message: error.message
        }))
    },
    plumberFONT: {
        errorHandler: notify.onError(error => ({
            title: "FONT",
            message: error.message
        }))
    },
    plumberSTATIC: {
        errorHandler: notify.onError(error => ({
            title: "STATIC",
            message: error.message
        }))
    },
    fonter: {
        formats: ["ttf", "woff", "eot", "svg"]
    },
    htmlMin: {
        collapseWitespace: isProd //Сжатие
    },
    imageMin: {
        verbose: true,
        // progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [imageminPngquant({quality: 60, speed: 5})],
        interlaced: true,
    },

    webpack: {
        mode: isProd ? "production" : "development"
    }
}
