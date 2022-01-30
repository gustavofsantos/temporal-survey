import type { DB } from "../utils/db";

type CreateSurveyData = {
  question: string;
  limit: number;
};

export class Survey {
  constructor(private readonly db: DB) {}

  create(data: CreateSurveyData) {
    return this.db.survey.create({
      data: {
        question: data.question,
        limit: data.limit,
      },
      select: {
        id: true,
        question: true,
      },
    });
  }
}
