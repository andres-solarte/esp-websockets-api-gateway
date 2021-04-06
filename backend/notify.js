import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REGION,
});
export const main = async (event, context, callback) => {
  try {
    const websocketConnector = new AWS.ApiGatewayManagementApi(CONNECTOR_OPTS);
    return await websocketConnector
      .postToConnection({
        ConnectionId: event.data.connectionId,
        Data: JSON.stringify(event.data),
      })
      .promise();
  } catch (error) {
    console.log(error);
    const errorResponse = (0, _requests.makeErrorResponse)(
      "Unexpected error processing the request " + error.message
    );
    callback(JSON.stringify(errorResponse));
    return errorResponse;
  }
};
