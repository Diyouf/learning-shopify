
import {
  useNavigate,
} from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Button,
  BlockStack,
  LegacyCard,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/app/blog`);
  };

  return (
    <Page>
      <TitleBar title="Remix app template">
        <button onClick={handleNavigation} variant="primary">
          Go to blog page
        </button>
      </TitleBar>
      <BlockStack gap="100">
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <Text as="h2" variant="">
                Hy Diyouf ,
              </Text>
              <p>View a summary of your online store’s performance.</p>
              <Button variant="primary" size="large" onClick={handleNavigation}>
                Navgate to blog
              </Button>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
