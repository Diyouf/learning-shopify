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
import { useActionData, useNavigate } from "@remix-run/react";
import db from "../db.server";

export const action = async ({ request }) => {
  let formData = await request.formData();
  formData = Object.fromEntries(formData);
  const newData = await db.customerReviewModel.create({ data: formData });
  return json(newData);
};

export default function Example() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const [formState, setFormState] = React.useState({
    productName: "",
    review: "",
  });
  if (actionData) {
    navigate("/app");
  }

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Form data fetching to component" sectioned>
            <Form method="POST">
              <FormLayout>
                <TextField
                  name="productName"
                  label="Product name"
                  value={formState.productName}
                  onChange={(value) => {
                    setFormState({ ...formState, productName: value });
                  }}
                  autoComplete="off"
                />
                <TextField
                  name="review"
                  type="text"
                  value={formState.review}
                  label="Review"
                  onChange={(value) => {
                    setFormState({ ...formState, review: value });
                  }}
                  autoComplete="off"
                />
                <Button onClick={() => document.querySelector("form").submit()}>
                  Submit
                </Button>
              </FormLayout>
            </Form>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
