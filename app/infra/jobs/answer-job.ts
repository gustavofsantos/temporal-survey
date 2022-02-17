import { Connection, WorkflowClient } from "@temporalio/client";
import { v4 as uuid } from "uuid";
import { AnswerSurvey, cancelAnswer } from "../../../temporal/src/workflows";

const connection = new Connection({
  address: process.env.TEMPORAL_ADDR,
});
const workflowClient = new WorkflowClient(connection.service);

export class AnswerJob {
  static async performLater({ surveyId, answer, email }) {
    const handle = await workflowClient.start(AnswerSurvey, {
      taskQueue: "survey",
      workflowId: uuid(),
      args: [{ surveyId, answer, email }],
    });

    console.log(`Started workflow ${handle.workflowId}`);
    return handle.workflowId;
  }
}

export class CancelAnswerJob {
  static async perform(workflowId) {
    const workflow = workflowClient.getHandle(workflowId);
    await workflow.signal(cancelAnswer.name);
  }
}
