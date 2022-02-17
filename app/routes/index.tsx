import { Link, useLoaderData } from "remix";
import { SurveyLoader } from "../lib/survey/survey-loader";

export const loader = async () => {
  return SurveyLoader.loadAll();
};

export default function IndexPage() {
  const surveys = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <article>
      <h1>My survey</h1>

      <ul>
        {surveys.map((survey) => (
          <li key={survey.id}>
            <Link to={`/survey/${survey.id}`}>{survey.question}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
