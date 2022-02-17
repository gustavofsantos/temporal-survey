import { db } from "../../infra/db";

export class Survey {
  static create({ question, limit }) {
    return db.survey.create({
      data: {
        question,
        limit,
      },
    });
  }

  static get(surveyId, { answers = true } = {}) {
    return db.survey.findUnique({
      where: { id: surveyId },
      include: { answers },
    });
  }

  static listAll({ answers = true } = {}) {
    return db.survey.findMany({
      include: { answers },
      orderBy: { createdAt: "desc" },
    });
  }
}
