module.exports = function (source) {
    console.log(source);
    return  `console.log('${source.toString().trim()}')`
}
