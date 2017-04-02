var expect = require('expect');

var {generateMessage, generateLocation} = require('./message');

describe('Test Generate Message', ()=>{
  it('should pass generateMessage test', (done) =>{
    var from = 'Cheng';
    var text = 'Test Text';
    var message = generateMessage(from, text);
    expect(message.from).toBeA('string').toBe('Cheng');
    expect(message).toExist('createdAt');
    done();
  });
});

describe('Test Generate Loaction',()=>{
  it('should pass generateLocation test', (done) =>{
    var from = 'Cheng';
    var la = '';
    var lo = '';
    var location = generateLocation(from, la, lo);
    expect(location.locationURL).toBeA('string');
    expect(location.from).toBeA('string').toBe('Cheng');
    expect(location.createdAt).toExist('createdAt');
    done();
  })
})
