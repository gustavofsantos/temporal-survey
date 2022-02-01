import { DB } from "../../utils/db";

export class SurveyLoader {
  constructor(private readonly db: DB) {}

  loadAll() {
    return this.db.survey.findMany({
      select: { id: true, question: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  }

  loadById(surveyId: string) {
    return this.db.survey.findUnique({
      where: { id: surveyId },
      select: {
        id: true,
        question: true,
        enabled: true,
        validSeconds: true,
        answers: {
          select: { id: true, email: true, value: true },
        },
      },
    });
  }
}
