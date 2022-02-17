import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
} from "remix";
import { AnswerJob, CancelAnswerJob } from "../../infra/jobs/answer-job";
import { Surveys } from "../../lib";

export const loader: LoaderFunction = async ({ params }) => {
  const survey = await Surveys.getById(params.id as string);
  if (survey?.enabled === false) {
    return redirect("/");
  }

  return survey;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const formId = formData.get("formId") as string;
  const answer = formData.get("answer") as string;
  const email = formData.get("email") as string;
  const surveyId = formData.get("surveyId") as string;
  const workflowId = formData.get("workflowId") as string;

  switch (formId) {
    case "answer-form": {
      const workflowId = await AnswerJob.performLater({
        surveyId,
        answer,
        email,
      });
      return { success: true, state: "answered", workflowId };
    }
    case "cancel-form": {
      await CancelAnswerJob.perform(workflowId);
      return { success: true, state: "cancelled" };
    }
    default:
      throw new Error("Action not found");
  }
};

export default function SurveyPage() {
  const survey = useLoaderData();
  const result = useActionData();
  const params = useParams();

  return (
    <article>
      <h1>{survey.question}</h1>

      {!result && (
        <Form method="post">
          <input name="formId" defaultValue="answer-form" hidden />
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
        </Form>
      )}

      {result?.state === "answered" && (
        <div className="mt-6 p-4 rounded-lg bg-green-300 border border-green-400 text-green-900">
          <p>Thank you!</p>

          <p>You have one minute to cancel!</p>

          <Form method="post">
            <input name="formId" defaultValue="cancel-form" hidden />
            <input name="workflowId" defaultValue={result.workflowId} hidden />

            <button type="submit">Cancel</button>
          </Form>
        </div>
      )}

      {result?.state === "cancelled" && (
        <div>
          <p>Ok, we will not store your answer.</p>
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
              <tr key={answer.id}>
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
