import {
  FormLayout,
  TextField,
  Page,
  Layout,
  LegacyCard,
  Button,
  Form,
  Text,
  Grid,
  Image,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import React from "react";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import db from "../db.server";
import { apiVersion, authenticate } from "../shopify.server";

const QueryInfo = `{
  products (first: 6) {
    edges {
      node {
        id
        title
        featuredImage {
          src
        }
      }
    }
  }
}`;

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;
  try {
    const productData = await fetch(
      `https://${shop}/admin/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({ query: QueryInfo }),
      },
    );

    if (productData.ok) {
      const data = await productData.json();
      const {
        data: {
          products: { edges },
        },
      } = data;

      return edges;
    } else {
      console.error("Error fetching product data:", productData.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const action = async ({ request }) => {
  let formData = await request.formData();
  formData = Object.fromEntries(formData);
  const newData = await db.customerReviewModel.create({ data: formData });
  return json(newData);
};

export default function Example() {
  const productData = useLoaderData() || [];
  const navigate = useNavigate();
  const actionData = useActionData();
  const [formState, setFormState] = React.useState({
    productName: "",
    review: "",
  });

  React.useEffect(() => {
    if (actionData) {
      navigate("/app");
    }
  }, [actionData, navigate]);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Text>Product names</Text>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            {productData.length > 0 ? (
              productData.map((review, index) => (
                <Grid.Cell
                  key={index}
                  columnSpan={{ xs: 6, sm: 3, md: 3, lg: 2, xl: 6 }}
                >
                  <LegacyCard title={review.node.title} sectioned>
                    <Image
                      source={review.node.featuredImage?.src || "No image"}
                      alt={review.node.title}
                      style={{
                        height: "50%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </LegacyCard>
                </Grid.Cell>
              ))
            ) : (
              <Text>No products available</Text>
            )}
          </Grid>
        </Layout.Section>
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
                <Button submit>Submit</Button>
              </FormLayout>
            </Form>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
