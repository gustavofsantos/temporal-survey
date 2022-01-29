import { ActionFunction, Form } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
};

export default function IndexPage() {
  return (
    <article>
      <h1>My survey</h1>

      <Form>
        <label htmlFor="response">What you think of this?</label>
        <input id="response" name="response" type="text" required />

        <button type="submit">Submit</button>
      </Form>
    </article>
  );
}
