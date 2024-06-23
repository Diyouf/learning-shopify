import {
  FormLayout,
  TextField,
  Page,
  Layout,
  LegacyCard,
  Button,
  Form,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import React from "react";
import { useActionData, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const data = {
    name: "diyouf",
    email: "diyouf@gmial.com",
  };
  return json(data);
};

export const action = async ({ request }) => {
  let formData = await request.formData();
  formData = Object.fromEntries(formData);
  return json(formData);
};

export default function Example() {
  const loader = useLoaderData();
  const actionData = useActionData();

  const [formState, setFormState] = React.useState(loader);

  

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Form data fetching to component" sectioned>
            <Form method="POST">
              <FormLayout>
                <TextField
                  name="name"
                  value={formState.name}
                  label="Store name"
                  onChange={(value) => {
                    setFormState({ ...formState, name: value });
                  }}
                  autoComplete="off"
                />
                <TextField
                  name="email"
                  type="email"
                  value={formState.email}
                  label="Account email"
                  onChange={(value) => {
                    setFormState({ ...formState, email: value });
                  }}
                  autoComplete="email"
                />
                <Button onClick={() => document.querySelector("form").submit()}>
                  Submit
                </Button>
              </FormLayout>
            </Form>
          </LegacyCard>
        </Layout.Section>
        {actionData && (
          <Layout.Section>
            <LegacyCard title="Submitted Data" sectioned>
              <p><strong>Name:</strong> {actionData.name}</p>
              <p><strong>Email:</strong> {actionData.email}</p>
            </LegacyCard>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
