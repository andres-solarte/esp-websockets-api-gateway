export const main = async (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'Disconnected successfully',
  })
}