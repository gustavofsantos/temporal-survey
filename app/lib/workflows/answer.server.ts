import { Connection, WorkflowClient } from "@temporalio/client";
import { v4 as uuid } from "uuid";
import { SurveyAnswered } from "../../../temporal/lib/workflows";

const connection = new Connection({
  address: "temporal:7233",
});
const workflowClient = new WorkflowClient(connection.service);

export const answer = async (
  surveyId: string,
  response: string,
  email: string
) => {
  await workflowClient.start(SurveyAnswered, {
    taskQueue: "survey",
    workflowId: uuid(),
    args: [surveyId, response, email],
  });
};
