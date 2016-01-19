'use strict';

var ref = new Firebase('https://isellyou.firebaseio.com/');
var questionRef = ref.child('question');
var $title, $content, $date;
var messagesRef = ref.child('messages');
var $message, $messages;

$(document).ready(function() {
  $('#nForm').submit(sellForm);
  $title = $('#title');
  $content = $('#content');
  $date = $('#date');

  $message = $('#message');
  $messages = $('#messages');
  $('#sendMessage').click(sendMessage);
  //$('#bigButton').click(startMessaging);
  
});

function sellForm(event){
  event.preventDefault();

  var title = $title.val();
  var content = $content.val();
  var  date = $date.val();

   questionRef.push({
    title: title,
    content: content,
    date: date
  })
 }

 questionRef.on('child_added', function(snapshot) {
 	var snapshotVal = snapshot.val();
 	console.log(snapshot)
  var $tr = $('#template').clone();
  $tr.removeAttr('id');
  $tr.children('.sTitle').text(snapshotVal.title);
  $tr.children('.sDate').text(snapshotVal.date);
  console.log(snapshot.key())
  $('#bigBoy').append($tr);
  $('.sContent').text(snapshotVal.content);
  

  
});


function sendMessage() {
  var message = $message.val();
  $message.val('');
  messagesRef.push({
    message: message
  });
}

messagesRef.on('child_added', function(snapshot) {
  var messageObject = snapshot.val();

  var message = messageObject.message;

  var $li = $('<li>').text(message);
  $messages.append($li);
});

