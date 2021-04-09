const SQS = require('aws-sdk/clients/sqs')

const { CREATE_PROCESS_SQS_QUEUE_URL } = process.env

const removeFromQueue = async receiptHandle => {
  const sqs = new SQS({
    region: 'us-east-1',
    apiVersion: '2012-11-05',
  })

  try {
    const res = await sqs
      .deleteMessage({
        QueueUrl: CREATE_PROCESS_SQS_QUEUE_URL,
        ReceiptHandle: receiptHandle,
      })
      .promise()
    console.log('borró la cola', res)
  } catch (error) {
    console.error(error, error.stack)
  }
}

module.exports = {
  removeFromQueue,
}
