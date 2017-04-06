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
    if(removeUser){
      this.userList = this.userList.filter((element)=>{
        return element.userId !== id;
      });
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
}

module.exports = {
  Users
}


// Add Users
// RemoveUser
// UserDescription
