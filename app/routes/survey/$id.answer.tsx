import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
} from "remix";
import { SurveyLoader } from "../../lib/survey/survey-loader";
import { answer } from "../../lib/workflows/answer.server";
import { db } from "../../utils/db";

export const loader: LoaderFunction = async ({ params }) => {
  const surveyLoader = new SurveyLoader(db);

  const survey = await surveyLoader.loadById(params.id as string);
  if ((survey?.answers.length ?? 0) >= (survey?.limit ?? 0)) {
    return redirect("/");
  }

  return survey;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const userAnswer = formData.get("answer") as string;
  const email = formData.get("email") as string;
  const surveyId = formData.get("surveyId") as string;

  await answer(surveyId, userAnswer, email);

  return { success: true };
};

export default function SurveyPage() {
  const survey = useLoaderData();
  const result = useActionData();
  const params = useParams();

  return (
    <article>
      <h1>{survey.question}</h1>
      <form method="post" action={`/survey/${params.id}/answer`}>
        <input name="surveyId" defaultValue={params.id} hidden />

        <label htmlFor="answer" className="flex flex-col w-full">
          Your answer?
          <input id="answer" name="answer" type="text" required />
        </label>

        <label htmlFor="email" className="flex flex-col w-full">
          What is your email?
          <input id="email" name="email" type="email" required />
        </label>

        <button type="submit">Submit</button>
      </form>

      {result?.success && (
        <div className="mt-6 p-4 rounded-lg bg-green-300 border border-green-400 text-green-900">
          <p>Thank you!</p>
        </div>
      )}

      <section className="mt-8">
        <h2>Answers</h2>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>E-mail</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {survey.answers.map((answer: any) => (
              <tr>
                <td>{answer.id}</td>
                <td>{answer.email}</td>
                <td>{answer.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
