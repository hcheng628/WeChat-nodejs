var client_socket = io();
var messageList = $('#message-list');

var crd = null;

function autoScroll() {
    var list = $('#message-list');
    var lastLi = list.children('li:last-child');
    if (parseInt(list.prop('clientHeight')) + parseInt(list.prop('scrollTop')) + parseInt(lastLi.innerHeight()) + parseInt(lastLi.prev().innerHeight()) >= parseInt(list.prop('scrollHeight'))) {
        // console.log('Yes: ' + scrollNumA + ' Condition Value: ' + scrollNumB);
        list.scrollTop(parseInt(list.prop('scrollHeight')));
    }
}

if ('geolocation' in navigator) {
    console.log('Current Device Support Geo Location Service');

    var geo_options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    function geo_success(pos) {
        crd = pos.coords;
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
    }

    function geo_error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
    console.log(crd);
} else {
    alert('Current Device does NOT Support Geo Location Service');
}

client_socket.on('connect', function() {
    console.log("Client: Connect to Server");
    // client_socket.emit('new_user', {
    //   from: 'CLIENT',
    //   text: 'Hello Everyone!',
    //   user: 'Cheng'
    // });
});

client_socket.on('disconnect', function() {
    console.log("Client: Disconnect from Server");
    // console.log("Client Socket: " , client_socket);
});

// Custom Socket Event Listener   --- Start
client_socket.on('server_notification', function(server_notification_response) {
    // console.log('Client Received: From: ' + server_notification_response.from + ' Text: ' + server_notification_response.text );
    var formatedTime = moment(server_notification_response.createdAt).format('MMM Do YYYY, h:mm:ss a');
    var template = $('#notification-template').html();
    var html = Mustache.render(template, {
        from: server_notification_response.from,
        text: server_notification_response.text,
        createdAt: formatedTime
    });
    messageList.append(html);
    autoScroll();
    /*
    var formatedTime = moment(server_notification_response.createdAt).format('h:mm a');
    messageList.append(`<li><span>${server_notification_response.from} ${formatedTime}: ${server_notification_response.text}</span></li>`);
    */
});

client_socket.on('new_location', function(new_server_location_response) {
    // console.log('Client Received: From: ' + new_server_location_response.from + ' Geo URL: ' + new_server_location_response.locationURL );
    var formatedTime = moment(new_server_location_response.createdAt).format('h:mm a');
    var template = $('#location-template').html();
    var html = Mustache.render(template, {
        from: new_server_location_response.from,
        locationURL: new_server_location_response.locationURL,
        createdAt: formatedTime
    });
    messageList.append(html);
    autoScroll();
    /*
    var formatedTime = moment(new_server_location_response.createdAt).format('h:mm a');
    messageList.append(`<li><span>${new_server_location_response.from} ${formatedTime}</span> : <a target="_blank" href="${new_server_location_response.locationURL}">Geo Location</a></li>`);
    */
});

client_socket.on('new_message', function(new_message) {
    var formatedTime = moment(new_message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: new_message.from,
        text: new_message.text,
        createdAt: formatedTime
    });
    messageList.append(html);
    autoScroll();
    // console.log('Client Received: From: ' + new_message.from + ' Geo URL: ' + new_message.text );
    /*
    var formatedTime = moment(new_message.createdAt).format('h:mm a');
    messageList.append(`<li><span>${new_message.from} ${formatedTime}: ${new_message.text}</span></li>`);
    */
    // callback('new_message: Client 200');
})

// client_socket.on('new_user', function(new_user){
//   console.log('Client Received: From: ' + new_user.from + ' Text: ' + new_user.text );
// });
// Custom Socket Event Listener   --- End


$('#message-form').on('submit', function(event) {
    // alert($('#input_message').val());
    var textBox = $('#input_message');
    event.preventDefault();
    if (textBox.val() == '' || textBox.val() == null) {
        return;
    }
    client_socket.emit('new_message', {
        from: 'CLIENT',
        text: textBox.val()
    }, function(serverStatus) {
        textBox.val('');
        // alert('Client new_message: ' + serverStatus);
        // messageList.append(`<li><a href="."><span>${$('#input_message').val()}</span></a></li>`);
    });
});

$('#btn-send-location').on('click', function(event) {
    var geoButton = $('#btn-send-location');
    // console.log(geoButton);
    if (crd) {
        geoButton.attr('disabled', true).text('Sending......');
        client_socket.emit('new_location', {
            from: 'CLIENT',
            la: crd.latitude,
            lo: crd.longitude
        }, function(serverStatus) {
            geoButton.attr('disabled', false).text('Share Geo Location');
            // alert('Client new_location: ' + serverStatus);
        });
    } else {
        return alert('Geo Location Unavailable');
    }
});
