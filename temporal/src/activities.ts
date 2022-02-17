import { Email } from "../../app/lib/mailer";
import { Survey } from "../../app/lib/survey";
import { db } from "../../app/infra/db";

export async function storeSurveyAnswer(
  surveyId: string,
  answer: string,
  email: string
) {
  const survey = new Survey(db);
  return survey.answer(surveyId, { value: answer, email });
}

export async function loadSurveyById(surveyId: string) {
  return db.survey.findUnique({ where: { id: surveyId } });
}

export async function disableSurvey(surveyId: string) {
  await new Survey(db).disable(surveyId);
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
