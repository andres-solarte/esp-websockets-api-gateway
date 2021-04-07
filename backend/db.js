const AWS = require('aws-sdk')
const moment = require('moment')
const documentClient = new AWS.DynamoDB.DocumentClient()

const { PROCESS_CREATION_STATUS_TABLE } = process.env

const updateConnection = (uuid, connectionId, status) => {
  const updateParams = {
    TableName: PROCESS_CREATION_STATUS_TABLE,
    Key: { uuid },
    UpdateExpression: 'set #uuid = :uuid, #connectionId = :connectionId, #status = :status',
    ExpressionAttributeNames: {
      '#uuid': 'uuid',
      '#connectionId': 'connectionId',
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':uuid': moment().toISOString(),
      ':connectionId': connectionId,
      ':status': status,
    },
  }

  return documentClient.update(updateParams).promise()
}

const deleteRecordFromDynamo = async uuid => {
  const documentClient = AWS.dynamoDbDocumentClient()
  const params = {
    TableName: PROCESS_CREATION_STATUS_TABLE,
    Key: { uuid },
  }

  await documentClient.delete(params).promise()
}

module.exports = {
  updateConnection,
  deleteRecordFromDynamo,
}
