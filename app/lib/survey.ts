import type { DB } from "../utils/db";
import { startSurveyValidityWorkflow } from "./workflows/survey.server";

type CreateSurveyData = {
  question: string;
  validSeconds: number;
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
        validSeconds: data.validSeconds,
      },
      select: {
        id: true,
        question: true,
      },
    });

    await startSurveyValidityWorkflow({
      surveyId: survey.id,
      validSeconds: data.validSeconds,
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
      return;
    }

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
