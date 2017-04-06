var expect = require('expect');
const {Users} = require('./users');

describe('Test Users Class', ()=>{
  it('should create users instance and add a user test',()=>{
    var users = new Users();
    users.addUser('1', 'Cheng','NodeJS');
    expect(users.userList.length).toBe(1);
    // console.log(users.userList.length);
  });

  it('should get a given user test', ()=>{
    var users = new Users();
    users.addUser('1', 'Cheng','NodeJS');
    // console.log(users.userList.length);
    var fetchUser = users.getUser('1');
    // console.log("Find this User: " + JSON.stringify(fetchUser,undefined,2));
    expect(users.userList[0].userId).toBe('1');
    expect(users.userList[0].userName).toBe('Cheng');
    expect(users.userList[0].userRoom).toBe('NodeJS');
  });


  it('should get a null(user) test', ()=>{
      var users = new Users();
      users.addUser('1', 'Cheng','NodeJS');
      var fetchUser = users.getUser('2');
      expect(fetchUser).toBe(null);
  });


  it('shold get user list test', ()=>{
    var users = new Users();
    users.addUser('1','ThinkPad User', 'ThinkPad');
    users.addUser('1','Mac User', 'Apple');
    users.addUser('1','System 76 User', 'System 76');
    expect(users.userList.length).toBe(3);
  });

  it('should remove a user', ()=>{
    var users = new Users();
    users.addUser('1','ThinkPad User', 'ThinkPad');
    users.addUser('3','Mac User', 'Apple');
    users.addUser('5','System 76 User', 'System 76');
    expect(users.userList.length).toBe(3);
    var userRemoved = users.removeUser('1');
    // console.log('Length: ' + users.userList.length);
    expect(users.userList.length).toBe(2);
    expect(userRemoved.userName).toBe('ThinkPad User');
    expect(userRemoved.userRoom).toBe('ThinkPad');
  });

});
