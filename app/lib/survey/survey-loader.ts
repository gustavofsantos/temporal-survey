import { db } from "../../infra/db";

export class SurveyLoader {
  static loadAll() {
    return db.survey.findMany({
      select: { id: true, question: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static loadById(surveyId: string) {
    return db.survey.findUnique({
      where: { id: surveyId },
      select: {
        id: true,
        question: true,
        enabled: true,
        limit: true,
        answers: {
          select: { id: true, email: true, value: true },
        },
      },
    });
  }
}
