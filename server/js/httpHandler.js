const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };


module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var message;
  // Write a request handler for Getting data for swimmers
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      message = messageQueue.dequeue();
      res.end(message);
      next();
    } else if (req.url === '/background.jpg') {
      if ( fs.existsSync(module.exports.backgroundImageFile) ) {
        res.writeHead(200, headers);
        res.end();
        next();
      } else {
        res.writeHead(404, headers);
        res.end();
        next();
      }
    }
  }


  /**
   *
   */

  if (req.method === 'POST') {
    // fs.readFile('/file', (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });
    let data = Buffer.alloc(0);
    // let data = [];
    req.on('data', chunk => {
      // console.log(chunk);
      // data.push(chunk);
      // data += chunk;
      data = Buffer.concat([data, chunk]);
    });
    // console.log('data', data);
    // let buffer = Buffer.concat(data).toString();
    // console.log('buffer', buffer);
    req.on('end', () => {
      let file = multipart.getFile(data)
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        if (err) {
          throw err;
        }
        console.log('The file has been saved!');
      });
    });
    res.writeHead(201, headers);
    res.end();
    next();
  }

  if (req.method === 'OPTIONS') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.end();
      next();
    }
  }
    // invoke next() at the end of a request to help with testing!
};
