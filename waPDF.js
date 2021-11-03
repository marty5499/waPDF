const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

((async function () {
  console.log("process path:",process.argv[2]);
  dir = process.argv[2]
  var cfg = fs.readFileSync(path.join(dir,'cfg.json'),'utf-8');
  cfg = JSON.parse(cfg);

  listDir(dir, async function (filename) {
    await run(dir, filename,cfg.filename,cfg.scale,cfg.x,cfg.y)
      .catch(err => console.log(err));
  });
})())

// 將指定目錄下所有的pdf檔案加上印章
async function run(dir, filename,imgFile,scale,xx,yy) {
  // Create a new document and add a new page
  const doc = await PDFDocument.load(fs.readFileSync(path.join(dir, filename)));
  const page = doc.getPage(0);

  // Load the image and store it as a Node.js buffer in memory
  let img = fs.readFileSync(path.join(dir, imgFile));
  img = await doc.embedPng(img);

  // Draw the image on the center of the page
  const { width, height } = img.scale(scale);
  page.drawImage(img, { x: xx, y: yy,width:width,height:height});

  // Write the PDF to a file
  fs.writeFileSync(path.join(dir, filename), await doc.save());
}

function listDir(directoryPath, processPDF) {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      if (file.toLowerCase().endsWith('.pdf')) {
        processPDF(file);
      }
    });
  });
}