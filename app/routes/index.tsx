import { Link, useLoaderData } from "remix";
import { SurveyLoader } from "../lib/survey/survey-loader";
import { db } from "../utils/db";

export const loader = async () => {
  const surveyLoader = new SurveyLoader(db);
  return surveyLoader.loadAll();
};

export default function IndexPage() {
  const surveys = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <article>
      <h1>My survey</h1>

      <Link to="/survey/manage">Manage surveys</Link>

      <ul>
        {surveys.map((survey) => (
          <li key={survey.id}>
            <Link to={`/survey/${survey.id}/answer`}>{survey.question}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
