var client_socket = io();
var messageList = $('#message-list');

var crd = null;

if('geolocation' in navigator){
  console.log('Current Device Support Geo Location Service');

  var geo_options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  function geo_success(pos){
    crd = pos.coords;
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  }

  function geo_error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  console.log(crd);
}else{
  alert('Current Device does NOT Support Geo Location Service');
}

client_socket.on('connect',function(){
  console.log("Client: Connect to Server");
    // client_socket.emit('new_user', {
    //   from: 'CLIENT',
    //   text: 'Hello Everyone!',
    //   user: 'Cheng'
    // });
});

client_socket.on('disconnect',function(){
  console.log("Client: Disconnect from Server");
  // console.log("Client Socket: " , client_socket);
});

// Custom Socket Event Listener   --- Start
client_socket.on('server_notification',function(server_notification_response){
  console.log('Client Received: From: ' + server_notification_response.from + ' Text: ' + server_notification_response.text );
});

client_socket.on('new_location',function(new_server_location_response){
  console.log('Client Received: From: ' + new_server_location_response.from + ' Geo URL: ' + new_server_location_response.locationURL );
  messageList.append(`<li><a target="_blank" href="${new_server_location_response.locationURL}"><span>${new_server_location_response.from} Geo Location</span></a></li>`);
});

client_socket.on('new_message', function(new_message){
  // console.log('Client Received: From: ' + new_message.from + ' Geo URL: ' + new_message.text );
  messageList.append(`<li><span>${new_message.text}</span></li>`);
  // callback('new_message: Client 200');
})

// client_socket.on('new_user', function(new_user){
//   console.log('Client Received: From: ' + new_user.from + ' Text: ' + new_user.text );
// });
// Custom Socket Event Listener   --- End


$('#message-form').on('submit',function(event){
  // alert($('#input_message').val());
  event.preventDefault();
  client_socket.emit('new_message',{
    from: 'CLIENT',
    text: $('#input_message').val()
  },function(serverStatus){
    alert('Client new_message: ' + serverStatus);
    // messageList.append(`<li><a href="."><span>${$('#input_message').val()}</span></a></li>`);
  });
});

$('#btn-send-location').on('click',function(event){
  if(crd){
    client_socket.emit('new_location',{
        from: 'CLIENT',
        la: crd.latitude,
        lo: crd.longitude
    }, function(serverStatus){
      alert('Client new_location: ' + serverStatus);
    });
  }else{
    return alert('Geo Location Unavailable');
  }
});
