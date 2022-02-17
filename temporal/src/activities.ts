import { Email } from "../../app/lib/mailer";
import { Surveys } from "../../app/lib";

export async function storeSurveyAnswer(
  surveyId: string,
  value: string,
  email: string
) {
  return Surveys.answer({ surveyId, value, email });
}

export async function loadSurveyById(surveyId: string) {
  return Surveys.getById(surveyId);
}

export async function sendConfirmationEmail(
  email: string,
  data: { question: string; answer: string }
) {
  const emailProvider = process.env.EMAIL_PROVIDER as string;

  await Email.select(emailProvider as any).send({
    to: email,
    from: "temporal-survey@email.com",
    subject: "Thank You!",
    body: `You rock, ${email}!

The question was: "${data.question}"

You answered "${data.answer}"`,
    type: "text",
  });

  return true;
}

export async function sendCancelationEmail(email: string) {
  const emailProvider = process.env.EMAIL_PROVIDER as string;

  await Email.select(emailProvider as any).send({
    to: email,
    from: "temporal-survey@email.com",
    subject: "Oops",
    body: `Your answer wasn't stored.`,
    type: "text",
  });

  return true;
}
