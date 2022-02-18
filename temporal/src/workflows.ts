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
  let state: AnswerState = "PENDING";
  const survey = await loadSurveyById(surveyId);

  wf.setHandler(cancelAnswer, () => {
    state = "CANCELLED";
  });

  const isCancelled = await wf.condition(() => state === "CANCELLED", "1m");
  if (isCancelled) {
    await sendCancelationEmail(email);
    return;
  }

  const answerSuccessfully = await storeSurveyAnswer(surveyId, answer, email);

  if (answerSuccessfully) {
    console.log("Answer confirmed!");
    await wf.sleep("2m");
    console.log("Sending confirmation e-mail...");
    await sendConfirmationEmail(email, { question: survey!.question, answer });
  } else {
    // enviar algum outro e-mail indicando que a resposta não foi armazenada
  }
}
