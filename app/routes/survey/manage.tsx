import { ActionFunction, useLoaderData, Link, redirect } from "remix";
import { Survey } from "../../lib/survey";
import { SurveyLoader } from "../../lib/survey/survey-loader";
import { db } from "../../utils/db";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const question = formData.get("question") as string;
  const limit = formData.get("limit") as string;

  const { id } = await new Survey(db).create({
    question,
    limit: parseInt(limit),
  });

  return redirect(`/survey/${id}/answer`);
};

export const loader = async () => {
  const surveyLoader = new SurveyLoader(db);
  return surveyLoader.loadAll();
};

export default function SurveysPage() {
  const data = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <article>
      <h1>Surveys</h1>

      <section>
        <form method="post" action="/survey/manage">
          <label htmlFor="question-input">
            Question
            <input id="question-input" name="question" type="text" required />
          </label>

          <label htmlFor="limit-input">
            Limit of answers
            <input
              id="limit-input"
              name="limit"
              type="number"
              min={1}
              max={1000}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="mt-8">
        <h2>Surveys</h2>

        <ul>
          {data.map((survey) => (
            <li key={survey.id} className="list-item">
              <Link to={`/survey/${survey.id}/answer`}>{survey.question}</Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
