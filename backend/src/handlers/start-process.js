import SQS from 'aws-sdk/clients/sqs'

export const main = async event => {
  let statusCode = httpStatusCodes.OK

  const AWS_CONFIG = {
    region: process.env.AWS_REGION || 'us-east-1',
  }

  const {
    pathParameters: { uuid },
  } = event

  const sqsService = new SQS(AWS_CONFIG)
  const messageGroupId = 'create-process'

  await sqsService
    .sendMessage({
      QueueUrl: process.env.CREATE_PROCESS_SQS_QUEUE_URL,
      MessageBody: uuid,
      MessageGroupId: messageGroupId,
    })
    .promise()

  return {
    headers: responseHeaders,
    statusCode: statusCode,
  }
}
