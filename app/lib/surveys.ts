import { Answer } from "./survey/answer";
import { Survey } from "./survey/survey";

export class Surveys {
  static create({ question, limit }: { question: string; limit: number }) {
    return Survey.create({ question, limit });
  }

  static async getById(surveyId: string) {
    return Survey.get(surveyId);
  }

  static listAll() {
    return Survey.listAll();
  }

  static async answer({
    surveyId,
    value,
    email,
  }: {
    surveyId: string;
    value: string;
    email: string;
  }) {
    const survey = await Survey.get(surveyId);
    if (!survey) throw new Error("Survey not found.");

    if (survey.enabled === false) {
      console.warn("Unable to answer an disabled survey.");
      return false;
    }

    const answers = await Answer.answersOfSurvey(surveyId);
    if (survey.limit <= answers.length) {
      console.warn("Answers limit reached.");
      return false;
    }

    await Answer.create({ surveyId, value, email });
    return true;
  }
}
