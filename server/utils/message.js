var moment = require('moment');

var generateMessage = function(from, text){
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var generateLocation = function ( from, la, lo){
  return {
    from,
    locationURL: `https://www.google.com/maps/?q=${la},${lo}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage,
  generateLocation
}
