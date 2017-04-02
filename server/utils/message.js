var generateMessage = function(from, text){
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};

var generateLocation = function ( from, la, lo){
  return {
    from,
    locationURL: `https://www.google.com/maps/?q=${la},${lo}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocation
}
