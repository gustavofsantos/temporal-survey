import { Connection, WorkflowClient } from "@temporalio/client";
import { v4 as uuid } from "uuid";
import { SurveyValidity } from "../../../temporal/src/workflows";

type StartSurveyValidityWorkflowData = {
  surveyId: string;
  validSeconds: number;
};

const connection = new Connection({
  address: process.env.TEMPORAL_ADDR,
});
const workflowClient = new WorkflowClient(connection.service);

export const startSurveyValidityWorkflow = async (
  data: StartSurveyValidityWorkflowData
) => {
  const handle = await workflowClient.start(SurveyValidity, {
    taskQueue: "survey",
    workflowId: uuid(),
    args: [{ surveyId: data.surveyId, validSeconds: data.validSeconds }],
  });

  console.log(`Started workflow ${handle.workflowId}`);

  return handle.workflowId;
};
