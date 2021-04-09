const uuid = 'ab-1'
const webSocketUrl = `wss://mln93hqaxk.execute-api.us-east-1.amazonaws.com/local?uuid=${uuid}`

let webSocket

const onOpen = evt => {
  console.log('onOpen', evt)
  alert('WebSocket rocks')

  //webSocket.send(JSON.stringify({ uuid }))
}

const onClose = evt => {
  console.log('onClose', evt)
}

const onMessage = evt => {
  console.log('onMessage', evt)
  debugger
  //webSocket.close()
}

const onError = evt => {
  console.log('onError', evt)
  webSocket.close()
}

const openSocketConnection = () => {
  webSocket = new WebSocket(webSocketUrl)

  webSocket.onopen = evt => onOpen(evt)
  webSocket.onclose = evt => onClose(evt)
  webSocket.onmessage = evt => onMessage(evt)
  webSocket.onerror = evt => onError(evt)
}
