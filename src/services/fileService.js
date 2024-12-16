const { unlink } = require('node:fs');
const path = require('path');


const removeFile = (name) => {
  unlink(path.join(__dirname, `../../public/files/${name}`), (err) => {
    if (err) throw err;
  });
}

const readFile = (name) => {
  return path.join(__dirname, `../../public/files/${name}`);
}


module.exports = { removeFile, readFile }