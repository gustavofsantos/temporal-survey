const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  await prisma.survey.create({
    data: {
      question: "This is ok for you?",
    },
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
