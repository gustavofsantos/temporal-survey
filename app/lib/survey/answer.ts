import { db } from "../../infra/db";

export class Answer {
  static create({ surveyId, value, email }) {
    return db.answer.create({
      data: {
        surveyId,
        email,
        value,
      },
    });
  }

  static answersOfSurvey(surveyId) {
    return db.answer.findMany({ where: { surveyId } });
  }

  static listAll() {
    return db.answer.findMany();
  }
}
