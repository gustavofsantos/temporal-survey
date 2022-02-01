import * as wf from "@temporalio/workflow";
import type * as activities from "./activities";

const { storeSurveyAnswer, sendConfirmationEmail, disableSurvey } =
  wf.proxyActivities<typeof activities>({
    startToCloseTimeout: "1 minute",
  });

type SurveyAnsweredData = {
  surveyId: string;
  answer: string;
  email: string;
  validSeconds: number;
};

type SurveyValidityData = {
  surveyId: string;
  validSeconds: number;
};

export async function SurveyAnswered({
  surveyId,
  answer,
  email,
}: SurveyAnsweredData) {
  await storeSurveyAnswer(surveyId, answer, email);

  await wf.sleep("10s");

  await sendConfirmationEmail(email);
}

export async function SurveyValidity({
  surveyId,
  validSeconds,
}: SurveyValidityData) {
  console.log(`Waiting ${validSeconds}s to disable survey ${surveyId}`);
  await wf.sleep(`${validSeconds}s`);

  await disableSurvey(surveyId);
}
