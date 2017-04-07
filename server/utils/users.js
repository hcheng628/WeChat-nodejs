class Users {

  constructor(){
    this.userList = [];
  }

  addUser(userId, userName, userRoom){
    var new_user = {userId, userName, userRoom};
    this.userList.push(new_user);
    return new_user;
  }

  removeUser(id){
    var removeUser = this.getUser(id);
    // console.log('----- Before:' + JSON.stringify(this.userList,undefined,2));
    if(removeUser){
      this.userList = this.userList.filter((element)=>{
        // console.log('----- Element:' + JSON.stringify(element,undefined,2));
        return element.userId !== id;
      });
      // console.log('----- After:' + JSON.stringify(this.userList,undefined,2));
      return removeUser;
    }else{
      return null;
    }
  }

  getUser(id){
    var returnUser = this.userList.find((element)=>{
      // console.log('Element: ', element);
      // console.log('Element: ID ', element.userId);
      // console.log('Element: Name ', element.userName);
      // console.log('Element: Room ', element.userRoom);
      // console.log( "---: ",  element.userId == id);
      return element.userId == id;
    });
    if(returnUser == undefined){
      returnUser = null;
    }
    return returnUser;
  }

  getUserList(){
    return this.userList;
  }

  getUserListByRoom(inRoomName){
    var userListByRoom = [];
    if(inRoomName != null && inRoomName != '' && inRoomName != undefined){
      userListByRoom = this.userList.filter((element)=>{
        // console.log('----- Element:' + JSON.stringify(element,undefined,2));
        return element.userRoom == inRoomName;
      });
      // console.log('----- After:' + JSON.stringify(this.userList,undefined,2));
      return userListByRoom;
    }else{
      return null;
    }
  }
}

module.exports = {
  Users
}
