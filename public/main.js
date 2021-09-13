const socket = io()

const clientTotal = document.getElementById('clients-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('message-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (data) => {
  data.preventDefault()
  sendMessage()
})

socket.on('clients-total', (data) => {
  clientTotal.innerHTML = `Total Client ${data}`
})

function sendMessage() {
  if(messageInput.value === '') {
    return;
  }
  const payload = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date()
  }

  socket.emit('message', payload)
  addMessageToUI(true, payload)
  messageInput.value = '';
}

socket.on('chat-message', (data) => {
  addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
  const messageElement = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
      <p class="message">
        ${data.message}
        <span>${data.name} . ${moment(data.time).fromNow()}</span>
      </p>
    </li>
  `;

  messageContainer.innerHTML += messageElement
  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}