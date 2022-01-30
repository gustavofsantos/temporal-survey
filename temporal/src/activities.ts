import { PrismaClient } from "@prisma/client";
import { Email } from "../../app/lib/mailer";

export async function storeSurveyAnswer(
  surveyId: string,
  answer: string,
  email: string
) {
  const prisma = new PrismaClient();

  console.log("storing answer...");

  const result = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      answers: {
        create: {
          email,
          value: answer,
        },
      },
    },
  });

  console.log("storing answer... OK");

  await prisma.$disconnect();

  return result;
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
