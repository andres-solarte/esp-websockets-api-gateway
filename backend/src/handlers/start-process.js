const SQS = require('aws-sdk/clients/sqs')

module.exports.main = async event => {
  const {
    pathParameters: { uuid },
  } = event

  const sqs = new SQS({
    region: 'us-east-1',
    apiVersion: '2012-11-05',
  })

  const messageGroupId = 'create-process'

  const params = {
    QueueUrl: process.env.CREATE_PROCESS_SQS_QUEUE_URL,
    MessageBody: uuid,
    MessageGroupId: messageGroupId,
  }

  console.log(params)

  await sqs.sendMessage(params).promise()

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: 200,
  }
}
