import { Link, LoaderFunction, useLoaderData } from "remix";
import { SurveyLoader } from "~/lib/survey/survey-loader";
import { db } from "~/utils/prisma";

export const loader = async () => {
  const surveyLoader = new SurveyLoader(db);
  return surveyLoader.loadAll();
};

export default function IndexPage() {
  const surveys = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <article>
      <h1>My survey</h1>

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
