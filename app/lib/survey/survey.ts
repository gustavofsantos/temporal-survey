import { db } from "../../infra/db";

export class Survey {
  static create({ question, limit }: { question: string; limit: number }) {
    return db.survey.create({
      data: {
        question,
        limit,
      },
    });
  }

  static get(surveyId: string) {
    return db.survey.findUnique({
      where: { id: surveyId },
      include: { answers: true },
    });
  }

  static listAll() {
    return db.survey.findMany({
      include: { answers: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
