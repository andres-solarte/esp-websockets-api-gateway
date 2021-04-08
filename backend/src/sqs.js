const SQS = require('aws-sdk/clients/sqs')

const { QUEUE_CREATE_PROCESS_URL } = process.env

const removeFromQueue = (receiptHandle) => {
  const sqs = new SQS({
    region: 'us-east-1',
    apiVersion: '2012-11-05'
  })

  try {
    await sqs
      .deleteMessage({
        QueueUrl: QUEUE_CREATE_PROCESS_URL,
        ReceiptHandle: receiptHandle
      })
      .promise()
  } catch (error) {
    console.error(error, error.stack)
  }
}

module.exports = {
  removeFromQueue
}