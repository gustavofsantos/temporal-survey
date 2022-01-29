import * as wf from "@temporalio/workflow";
import type * as activities from "./activities";

const { storeSurveyAnswer, sendConfirmationEmail } = wf.proxyActivities<
  typeof activities
>({
  startToCloseTimeout: "1 minute",
});

export async function SurveyAnswered(
  surveyId: string,
  answer: string,
  email: string
) {
  const surveyAnswer = await storeSurveyAnswer(surveyId, answer, email);
  console.log("survey stored", surveyAnswer);

  await wf.sleep("5s");

  return await sendConfirmationEmail(email);
}
