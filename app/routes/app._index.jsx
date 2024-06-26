import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  BlockStack,
  LegacyCard,
  Grid,
  EmptyState,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { json } from "@remix-run/node";
import db from "../db.server";

export const loader = async () => {
  const customerReviewData = await db.customerReviewModel.findMany();
  return json(customerReviewData);
};

export default function Index() {
  const reviewData = useLoaderData();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/app/blog`);
  };

  return (
    <Page>
      <TitleBar title="Remix app template">
        <button onClick={handleNavigation} variant="primary">
          Go to review page
        </button>
      </TitleBar>
      <BlockStack gap="100">
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned title="Hi Diyouf,">
              <Text>View a summary of your online store’s performance.</Text>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>
            {reviewData.length > 0 ? (
              <Grid>
                {reviewData.map((review, index) => (
                  <Grid.Cell
                    key={index}
                    columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                  >
                    <LegacyCard  title={review.productName} sectioned>
                      <p>{review.review}</p>
                    </LegacyCard>
                  </Grid.Cell>
                ))}
              </Grid>
            ) : (
              <LegacyCard sectioned>
                <EmptyState
                  heading="Manage your inventory transfers"
                  action={{
                    content: "Go to review page",
                    onAction: handleNavigation,
                  }}
                  secondaryAction={{
                    content: "Learn more",
                    url: "https://help.shopify.com",
                  }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>
                    Track and receive your incoming inventory from suppliers.
                  </p>
                </EmptyState>
              </LegacyCard>
            )}
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
