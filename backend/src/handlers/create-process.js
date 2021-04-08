const { updateConnection } = require('../db')
const { removeFromQueue } = require('../sqs')

export const main = async (event, context, callback) => {
  console.log('it started consume process service')

  //Recibe datos de sqs
  for (const { body: uuid, receiptHandle } of event.Records) {
    console.log(JSON.stringify(body, null, 2))
    console.log('receiptHandle', receiptHandle)
    console.log('llegó datos a la cola ', uuid)
  }

  //Crea registro en dynamo
  const status = 'CREATING_PROCESS'
  await updateConnection(uuid, connectionId, status)

  await removeFromQueue(receiptHandle)

  //Simula crear proceso
  setTimeout(() => {
    console.log('World!')
  }, 20000)

  //Actualiza resultado de creación de proceso
  await updateConnection(uuid, connectionId, 'CREATED_PROCESS')

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}
