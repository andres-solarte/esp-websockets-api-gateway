import { StepFunctions, config } from "aws-sdk";

config.update({
  region: process.env.REGION,
});

export const main = async (event, context, callback) => {
  const recordsProcessed = [];

  for (const f of event.Records) {
    console.log("llego datos a ala cola ", f);
  }

  const response = {
    type: "create_emision_start",
    body: "Started execution",
  };
  callback(null, { statusCode: 200, body: JSON.stringify(response) });

 
};
