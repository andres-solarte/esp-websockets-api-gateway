const { updateStatusByUuid } = require('../db')
const { removeFromQueue } = require('../sqs')

module.exports.main = async (event, context, callback) => {
  console.log('it started consume process service')

  //Recibe datos de sqs
  for (const { body, receiptHandle } of event.Records) {
    console.log(JSON.stringify(body, null, 2))
    const { uuid } = JSON.parse(body)
    console.log('llegaron datos a la cola ', uuid)

    //Crea registro en dynamo
    await updateStatusByUuid(uuid, 'CREATING_PROCESS')

    //Simula crear proceso
    //await timeout(20000)

    //Actualiza resultado de creación de proceso
    await updateStatusByUuid(uuid, 'CREATED_PROCESS')

    await removeFromQueue(receiptHandle)
  }

  callback(null, {
    statusCode: 200,
    body: 'all ok',
  })
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
