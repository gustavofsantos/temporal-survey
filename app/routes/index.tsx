import { Link, useLoaderData } from "remix";
import { Surveys } from "../lib";

export const loader = async () => {
  return Surveys.listAll();
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
