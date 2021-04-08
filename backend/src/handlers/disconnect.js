module.exports.main = async (event, context, callback) => {
  console.log('Disconnected')
  console.log(event)

  callback(null, {
    statusCode: 200,
    body: 'Disconnected successfully',
  })
}
