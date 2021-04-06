export const main = async (event, context, callback) => {
  console.log("started consume emision service");

  setTimeout(() => {
    console.log("World!");
  }, 20000);
  return {
    headers: responseHeaders,
    statusCode: statusCode,
  };
};
