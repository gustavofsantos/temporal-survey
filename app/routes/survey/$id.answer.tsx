import { ActionFunction, useParams } from "remix";
import { answer } from "~/lib/workflows/answer.server";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const userAnswer = formData.get("answer") as string;
  const email = formData.get("email") as string;
  const surveyId = formData.get("surveyId") as string;

  await answer(surveyId, userAnswer, email);

  return null;
};

export default function SurveyPage() {
  const params = useParams();

  return (
    <form method="post" action={`/survey/${params.id}/answer`}>
      <input name="surveyId" defaultValue={params.id} hidden />

      <label htmlFor="answer">What you think of this?</label>
      <input id="answer" name="answer" type="text" required />

      <label htmlFor="email">What is your email?</label>
      <input id="email" name="email" type="email" required />

      <button type="submit">Submit</button>
    </form>
  );
}
