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
    }
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
