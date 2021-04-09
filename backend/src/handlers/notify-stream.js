const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-east-1',
})

//INSERT - MODIFY - REMOVE
const url = 'https://2rwlhgclnl.execute-api.us-east-1.amazonaws.com/local'

module.exports.main = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2))
  try {
    event.Records.filter(record => record.eventName === 'MODIFY').forEach(async record => {
      console.log(JSON.stringify(record, null, 2))
      const connectionId = record.dynamodb.NewImage.connectionId.S
      const uuid = record.dynamodb.NewImage.uuid.S
      const status = record.dynamodb.NewImage.status.S

      console.log('connectionId', record.dynamodb.NewImage.connectionId.S)
      console.log('status', record.dynamodb.NewImage.status.S)

      //Lógica para saber qué mensaje enviar dependiendo del evento del stream
      const websocketConnector = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: url,
      })

      return await websocketConnector
        .postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify({ uuid, status }),
        })
        .promise()
    })
  } catch (error) {
    console.log(error)
    const errorResponse = (0, _requests.makeErrorResponse)('Unexpected error processing the request ' + error.message)
    callback(JSON.stringify(errorResponse))
    return errorResponse
  }
}
