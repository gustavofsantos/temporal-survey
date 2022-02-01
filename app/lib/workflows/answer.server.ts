import { Connection, WorkflowClient } from "@temporalio/client";
import { v4 as uuid } from "uuid";
import { SurveyAnswered } from "../../../temporal/src/workflows";
import { db } from "../../utils/db";
import { Survey } from "../survey";

const connection = new Connection({
  address: process.env.TEMPORAL_ADDR,
});
const workflowClient = new WorkflowClient(connection.service);

export const answer = async (
  surveyId: string,
  answer: string,
  email: string
) => {
  const survey = await new Survey(db).findById(surveyId);

  const handle = await workflowClient.start(SurveyAnswered, {
    taskQueue: "survey",
    workflowId: uuid(),
    args: [{ surveyId, answer, email, validSeconds: survey!.validSeconds }],
  });

  console.log(`Started workflow ${handle.workflowId}`);
  return handle.workflowId;
};
