import { Email } from "../../app/lib/mailer";
import { Survey } from "../../app/lib/survey";
import { db } from "../../app/utils/db";

export async function storeSurveyAnswer(
  surveyId: string,
  answer: string,
  email: string
) {
  const survey = new Survey(db);

  console.log("storing answer... OK");

  return survey.answer(surveyId, { value: answer, email });
}

export async function disableSurvey(surveyId: string) {
  await new Survey(db).disable(surveyId);
}

export async function sendConfirmationEmail(email: string) {
  const emailProvider = process.env.EMAIL_PROVIDER as string;

  console.log("sending email...");

  await Email.select(emailProvider as any).send({
    to: email,
    from: "temporal-survey@email.com",
    subject: "Thank You!",
    body: `You rock, ${email}`,
    type: "text",
  });

  return true;
}
