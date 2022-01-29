import { Connection, WorkflowClient } from "@temporalio/client";
import { v4 as uuid } from "uuid";
import { SurveyAnswered } from "../../../temporal/src/workflows";

const connection = new Connection({
  address: process.env.TEMPORAL_ADDR,
});
const workflowClient = new WorkflowClient(connection.service);

export const answer = async (
  surveyId: string,
  response: string,
  email: string
) => {
  const handle = await workflowClient.start(SurveyAnswered, {
    taskQueue: "survey",
    workflowId: uuid(),
    args: [surveyId, response, email],
  });

  console.log(`Started workflow ${handle.workflowId}`);
  return handle.workflowId;
};
