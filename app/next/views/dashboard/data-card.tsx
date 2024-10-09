import * as React from "react";
import {
  Card,
  Text,
  Grid,
  Container,
  Button,
  Loading,
  Modal,
  useModal,
} from "@nextui-org/react";
import { Flex } from "@/components/flex";
import { Scan } from "react-iconly";
import ContentLoader, { Facebook } from "react-content-loader";

const Loader = () => (
  <ContentLoader viewBox="0 0 380 70">
    <rect x="0" y="0" rx="5" ry="5" width="350" height="15" />
    <rect x="0" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="0" y="40" rx="3" ry="3" width="250" height="10" />
    <rect x="0" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

export interface DataCardProps {
  title: string;
  subText: string;
  content: number;
  auditResult?: [];
  loading?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  subText,
  content,
  auditResult,
  loading,
}) => {
  const { setVisible, bindings } = useModal();

  const removeHyperlinks = (text: string) => {
    // Regex to find all URLs /(https?:\/\/[^\s]+)/g;
    const regex = /\(https?:\/\/[^\s]+\)/g;
    return text.replace(regex, "");
  };
  const list = auditResult?.map((item: any) => {
    console.log(item?.value?.title);
    return (
      <>
        <Text h2 size={18} weight="bold">
          {item?.value?.title}
        </Text>
        <Text size="$sm" css={{ mb: 5 }} color="$accents7">
          {removeHyperlinks(item?.value?.description)}
        </Text>
      </>
    );
  });

  if (loading) {
    return (
      <Card isHoverable variant="flat">
        <Card.Body>
          <Loader />
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card isHoverable variant="flat">
        <Card.Body>
          <Grid.Container>
            <Grid xs={10}>
              <Container fluid>
                <Text size="$sm" color="$accents7" transform="uppercase">
                  {title}
                </Text>
                {content >= 0 ? <Text h3>{content}</Text> : <Loading></Loading>}
                {content <= 0 && (
                  <Flex>
                    <Text size="$xs" color="$accents7">
                      {subText}
                    </Text>
                  </Flex>
                )}
              </Container>
            </Grid>
            <Grid xs={2}>
              <Button
                auto
                color="primary"
                icon={<Scan set="bold" />}
                onPress={() => setVisible(true)}
              />
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text
            id="modal-title"
            size={24}
            css={{
              textGradient: "45deg, $blue600 -20%, $green600 50%",
            }}
          >
            {title} & L7 RECOMMENDATIONS
          </Text>
        </Modal.Header>
        <Modal.Body>{list}</Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
