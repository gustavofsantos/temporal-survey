import { db } from "../../infra/db";

export class Answer {
  static create({
    surveyId,
    value,
    email,
  }: {
    surveyId: string;
    value: string;
    email: string;
  }) {
    return db.answer.create({
      data: {
        surveyId,
        email,
        value,
      },
    });
  }

  static answersOfSurvey(surveyId: string) {
    return db.answer.findMany({ where: { surveyId } });
  }

  static listAll() {
    return db.answer.findMany();
  }
}
