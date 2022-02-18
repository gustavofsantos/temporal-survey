import * as wf from "@temporalio/workflow";
import type * as activities from "./activities";

const {
  storeSurveyAnswer,
  loadSurveyById,
  sendConfirmationEmail,
  sendCancelationEmail,
} = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export const cancelAnswer = wf.defineSignal("cancelAnswer");

type AnswerState = "PENDING" | "CANCELLED" | "CONFIRMED";

type AnswerSurveData = {
  surveyId: string;
  answer: string;
  email: string;
};

export async function AnswerSurvey({
  surveyId,
  answer,
  email,
}: AnswerSurveData) {
  // 🤷‍♂️
}
