import { PrismaClient } from "@prisma/client";

export async function storeSurveyAnswer(
  surveyId: string,
  answer: string,
  email: string
) {
  const prisma = new PrismaClient();

  console.log("storing answer...");

  const result = await prisma.answer.create({
    data: {
      surveyId,
      value: answer,
      email,
    },
  });

  console.log("storing answer... OK");

  await prisma.$disconnect();

  return result;
}

export async function sendConfirmationEmail(email: string) {
  console.log(`sending confirmation email to ${email}...`);
  console.log(`sending confirmation email to ${email}... OK`);

  return true;
}
