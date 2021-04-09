const { updateConnection } = require('../db')

module.exports.main = async (event, context, callback) => {
  try {
    const uuid = event.queryStringParameters.uuid
    const connectionId = event.requestContext.connectionId
    console.log(event.requestContext)

    await updateConnection(uuid, connectionId, 'SOCKET_CONNECTED')

    callback(null, {
      statusCode: 201,
    })
  } catch (error) {
    console.error(error)
    callback(null, JSON.stringify(error))
  }
}
