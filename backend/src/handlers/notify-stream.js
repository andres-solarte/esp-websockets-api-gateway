import AWS from 'aws-sdk'

AWS.config.update({
  region: process.env.REGION,
})

export const main = async (event, context, callback) => {
  try {
    event.Records.filter(record => record.eventName === 'MODIFY').forEach(record => {
      //Lógica para saber qué mensaje enviar dependiendo del evento del stream
      console.log(JSON.stringify(record, null, 2))
    })

    // const websocketConnector = new AWS.ApiGatewayManagementApi(CONNECTOR_OPTS)
    // return await websocketConnector
    //   .postToConnection({
    //     ConnectionId: event.data.connectionId,
    //     //Message: status from dynamo y uuid
    //     Data: JSON.stringify(event.data),
    //   })
    //   .promise()
  } catch (error) {
    console.log(error)
    const errorResponse = (0, _requests.makeErrorResponse)('Unexpected error processing the request ' + error.message)
    callback(JSON.stringify(errorResponse))
    return errorResponse
  }
}
