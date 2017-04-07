var paramStrToObject = function(inStrParams){
  if(inStrParams == ''){
    return { user_name: ''};
  }else{
    inStrParams = inStrParams.substring(1);
    // console.log(inStrParams);
    return JSON.parse('{"' + decodeURI(inStrParams.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
  }
}

// console.log(JSON.stringify(paramStrToObject('?user_name=Cheng&room_name=Node'), undefined, 2));
