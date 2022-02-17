const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function run() {
  await db.answer.deleteMany();
  await db.survey.deleteMany();

  await db.survey.create({
    data: {
      question: "This is ok for you?",
      limit: 5,
    },
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
