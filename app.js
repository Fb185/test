

// Connect to the specified peer
const peerInput = document.getElementById('peer-input');
const peerUrl = peerInput.value;
const gun = Gun(peerUrl + '/gun');

// Generate a unique user ID
const userId = Gun.state().pub;

// Create a user node in the Gun database
const user = gun.get('users').get(userId);

// Send a message
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  // Generate a unique ID for the message
  const messageId = Date.now().toString();

  // Save the message in the Gun database under the user node
  user.get('messages').get(messageId).put({ text: message });

  // Clear the message input field
  messageInput.value = '';
}

// Receive messages
user.get('messages').map().on(function (message, messageId) {
  console.log('Received Message:', message.text);
});

// Retrieve existing messages
user.get('messages').map().once(function (message) {
  console.log('Existing Message:', message.text);
});
