const Jimp = require('jimp');

module.exports = (robot) => {
  const onfile = (res, file) => {
    res.download(file, (path) => {
      let ext = file.name.slice(-4);
      Jimp.read(path).then((image) => {
        image.grayscale((err, image) => {
          let newFileName = Math.random().toString(32).substring(2) + ext;
          image.write('images/' + newFileName, (err, image) => {
            res.send({
              path: 'images/' + newFileName
            });
          });
        });
      });
    });
  };

  robot.respond('file', (res) => {
    onfile(res, res.json);
  });
};

