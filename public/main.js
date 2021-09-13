const socket = io()

const clientTotal = document.getElementById('clients-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const messageTone = new Audio('/message-tone.mp3')

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
  messageTone.play()
  addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
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

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} sedang mengetik ...`,
  })
})

messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} sedang mengetik ...`,
  })
})
messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  })
})

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `
  messageContainer.innerHTML += element
})

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}
