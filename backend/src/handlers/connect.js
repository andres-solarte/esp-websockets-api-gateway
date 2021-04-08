module.exports.main = async (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Sec-WebSocket-Protocol': 'WebsocketConnection',
    },
    body: 'Connected successfully',
  })
}
