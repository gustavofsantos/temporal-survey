import type { DB } from "../infra/db";

type CreateSurveyData = {
  question: string;
  limit: number;
};

type AnswerSurveyData = {
  value: string;
  email: string;
};

export class Survey {
  constructor(private readonly db: DB) {}

  async create(data: CreateSurveyData) {
    const survey = await this.db.survey.create({
      data: {
        question: data.question,
        limit: data.limit,
      },
      select: {
        id: true,
        question: true,
      },
    });

    return survey;
  }

  findById(surveyId: string) {
    return this.db.survey.findUnique({
      where: { id: surveyId },
      include: {
        answers: true,
      },
    });
  }

  async answer(surveyId: string, data: AnswerSurveyData) {
    const survey = await this.db.survey.findUnique({ where: { id: surveyId } });
    if (survey?.enabled === false) {
      console.error("Unable to answer an disabled survey.");
      return false;
    }

    const isAbleToAnswer = await this.isAbleToAnswer(surveyId);
    if (!isAbleToAnswer) return false;

    await this.db.survey.update({
      where: { id: surveyId },
      data: {
        answers: {
          create: {
            value: data.value,
            email: data.email,
          },
        },
      },
    });

    return true;
  }

  private async isAbleToAnswer(surveyId: string) {
    const survey = await this.db.survey.findUnique({
      where: { id: surveyId },
      include: { answers: true },
    });
    return !!survey && survey.limit > survey.answers?.length;
  }

  async disable(surveyId: string) {
    await this.db.survey.update({
      where: { id: surveyId },
      data: {
        enabled: false,
      },
    });
  }
}
