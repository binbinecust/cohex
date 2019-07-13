const fs = require('fs');
const formidable = require('formidable');

module.exports = (req, opts) => (done) => {
    const data = {};
    const form = new formidable.IncomingForm(opts);
    form.on('field', function (name, value) {
        data[name] = value;
    })
    .on('file', function (name, file) {
        data[name] = fs.readFileSync(file.path)
    })
    .on('error', function (error) {
        done(error);
    })
    .on('end', function () {
        done(null, data);
    });
    form.parse(req);
};