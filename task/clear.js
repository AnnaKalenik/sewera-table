const del = require("del");
const path = require("../config/path");

const clear = () => {
    return  del(path.html.dest)
}

module.exports = clear;
